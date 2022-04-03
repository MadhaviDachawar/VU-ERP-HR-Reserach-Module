import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common/services/common/common.service';
import { AccountsService } from 'src/app/modules/accounts/accounts.service';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';
import { ProgrammeService } from 'src/app/common/services/programme/programme.service';

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-core-information',
    templateUrl: './core-information.component.html',
    styleUrls: ['./core-information.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class CoreInformationComponent implements OnInit, OnDestroy {

    @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) programme: MatAutocompleteTrigger;

    CoreInformation!: FormGroup;

    designations = ['Asst. Professor', 'Professor', 'Visiting Professor'];
    faculties: any[];
    allSchools: any[];
    allDepartments: any[];
    schools: { _id: string; schoolName: string }[];
    departments: { _id: string; departmentName: string }[];

    years = [];

    allFeeStructures = []
    feeConfigurations = [];

    sourceText = 'hami';
    inputLanguage = 'ne-t-i0-und';
    maxResult = 8;
    request = new XMLHttpRequest();

    pSub: Subscription;

    options = [];
    filteredProgrammes: Observable<any[]>;

    constructor(
        private _formBuilder: FormBuilder,
        private programmeService: ProgrammeService,
        public commonService: CommonService,
        private accountsService: AccountsService,
        private notificationService: NotificationServiceService
    ) { }

    private _filter(value: string): string[] {
        if (value != null) {
            const filterValue = value.toLowerCase();
            return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
        }
        else
            return this.options
    }

    programmeId = new FormControl("");
    facultyId = new FormControl("");
    schoolId = new FormControl("");
    departmentId = new FormControl("");

    ngOnInit(): void {

        this.CoreInformation = this._formBuilder.group({
            srnNumber: ['', Validators.required],
            prnNumber: [''],
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            admissionDate: [moment(), Validators.required],
            candidateQualifyingMarksheetName: ['', Validators.required],
            candidateQualifyingMarksheetNameDevnagiri: ['', Validators.required],
            programme: ['', Validators.required],
            admissionIntoYear: ['', Validators.required],
            faculty: ['', Validators.required],
            school: ['', Validators.required],
            department: ['', Validators.required],
        });

        // this.fSub = this.facultyService.getFaculties().subscribe((data) => {
        //     this.faculties = [...data];
        // });

        // this.sSub = this.schoolService.getSchools().subscribe((data) => {
        //     this.allSchools = [...data];
        //     this.schools = data.map((school) => ({
        //         _id: school._id,
        //         schoolName: school.schoolName,
        //     }));
        // });

        this.pSub = this.programmeService.getProgrammes().subscribe((data) => {

            this.options = data.map((programme) => ({
                _id: programme._id,
                faculty: programme.faculty.name,
                facultyId: programme.faculty._id,
                school: programme.school.name,
                schoolId: programme.school._id,
                department: programme.department.name,
                departmentId: programme.department._id,
                duration: programme.duration,
                name: programme.name
            }))

            this.filteredProgrammes = this.CoreInformation.controls.programme.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );

        })

        this.accountsService.getFeeStructures().subscribe((res: any) => {
            this.allFeeStructures = res
        })

        var filteredArray = []


        this.CoreInformation.get('programme').valueChanges.subscribe((value) => {
            filteredArray = this.options.filter(x => x.name == value)
            this.years = []
            this.feeConfigurations = []

            if (filteredArray.length != 0 && filteredArray.length != this.options.length) {

                this.programmeId.setValue(filteredArray[0]["_id"])

                this.facultyId.setValue(filteredArray[0].facultyId)
                this.CoreInformation.controls.faculty.setValue(filteredArray[0].faculty)

                this.schoolId.setValue(filteredArray[0].schoolId)
                this.CoreInformation.controls.school.setValue(filteredArray[0].school)

                this.departmentId.setValue(filteredArray[0].departmentId)
                this.CoreInformation.controls.department.setValue(filteredArray[0].department)

                for (let i = 0; i < filteredArray[0].duration; i++) {
                    this.years.push(this.commonService.numberToWords(i + 1) + ' Year')
                    this.feeConfigurations.push([])
                }

                for (const year of this.years) {
                    this.CoreInformation.addControl(this.commonService.camelize(year), new FormControl())
                }

                this.CoreInformation.get('admissionIntoYear').setValue(0)

            } else {
                this.programmeId.setValue("")
                this.CoreInformation.controls.faculty.setValue("")
                this.CoreInformation.controls.school.setValue("")
                this.CoreInformation.controls.department.setValue("")

                for (const year of this.years) {
                    this.CoreInformation.removeControl(this.commonService.camelize(year))
                }
            }
        })

        this.CoreInformation.get('admissionIntoYear').valueChanges.subscribe(() => {
            let newDate = new Date()
            let currentAcademicYear = Number(newDate.getFullYear().toString() + (newDate.getFullYear() + 1).toString())

            let mappedResponse = this.allFeeStructures.filter(x => x.programme._id == this.programmeId.value && x.academicYear == currentAcademicYear)

            if (mappedResponse.length <= filteredArray[0].duration - 1) {
                this.notificationService.error('Fee Structure for the programme: \n' + this.CoreInformation.get('programme').value + ' is not defined',
                    'Undefined Fee Structure'
                )
                return
            }

            this.feeConfigurations = []
            for (let i = 0; i < filteredArray[0].duration; i++) {
                this.feeConfigurations.push([])
            }

            for (const feeStructure of mappedResponse) {
                
                this.feeConfigurations[feeStructure.year].push(feeStructure)

                if (feeStructure.configurationName == 'Default') {
                    this.CoreInformation.get(this.commonService.camelize(this.commonService.numberToWords(feeStructure.year + 1) + " Year")).setValue(feeStructure._id)
                }
            }
        })

    }

    reduce(array: any) {
        return array.reduce((acc, value) => Number(acc) + Number(value.amount), 0)
    }

    resetProgramme() {
        this.CoreInformation.controls.programme.reset('');
        setTimeout(() => {
            this.programme.openPanel();
        }, 1);
    }

    ngOnDestroy(): void {
        this.pSub.unsubscribe();
    }
}
