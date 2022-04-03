import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MatOption,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { DepartmentService } from 'src/app/common/services/department/department.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const moment = _moment;

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

    @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) department: MatAutocompleteTrigger;

    CoreInformation!: FormGroup;

    designations = ['Asst. Professor', 'Professor', 'Visiting Professor'];
    faculties = [];
    allSchools = [];
    allDepartments = [];
    schools: { _id: string; name: string }[];
    departments: { _id: string; name: string }[];

    dSub: Subscription;

    options = [];
    filteredDepartments: Observable<any[]>;

    facultyId = new FormControl("");
    schoolId = new FormControl("");
    departmentId = new FormControl("");

    constructor(
        private _formBuilder: FormBuilder,
        private deptService: DepartmentService
    ) { }

    private _filter(value: string): string[] {
        if (value != null) {
            const filterValue = value.toLowerCase();
            return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
        }
        else
            return this.options
    }

    ngOnInit(): void {
        this.CoreInformation = this._formBuilder.group({
            employmentNumber: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            joiningDate: [moment(), Validators.required],
            aadhaarNo: ['', Validators.required],
            dlNo: ['', Validators.required],
            panNo: ['', Validators.required],
            passportNo: [''],
            joiningDesignation: ['', Validators.required],
            faculty: ['', Validators.required],
            school: ['', Validators.required],
            department: ['', Validators.required],
        });

        this.dSub = this.deptService.getDepartments().subscribe((data) => {
            this.options = data.map((department) => ({
                _id: department._id,
                faculty: department.faculty.name,
                facultyId: department.faculty._id,
                school: department.school.name,
                schoolId: department.school._id,
                name: department.name
            }))

            this.filteredDepartments = this.CoreInformation.controls.department.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        })

        this.CoreInformation.controls.department.valueChanges.subscribe((value) => {

            let filteredArray = this.options.filter(x => x.name == value)

            if (filteredArray.length != 0 && filteredArray.length != this.options.length) {

                this.departmentId.setValue(filteredArray[0]["_id"])

                this.facultyId.setValue(filteredArray[0].facultyId)
                this.CoreInformation.controls.faculty.setValue(filteredArray[0].faculty)

                this.schoolId.setValue(filteredArray[0].schoolId)
                this.CoreInformation.controls.school.setValue(filteredArray[0].school)
            }
            else {
                this.departmentId.setValue("")
                this.CoreInformation.controls.faculty.setValue("")
                this.CoreInformation.controls.school.setValue("")
            }
        })
    }

    resetDepartment() {
        this.CoreInformation.controls.department.reset('');
        setTimeout(() => {
            this.department.openPanel();
        }, 1);
    }

    ngOnDestroy(): void {
        this.dSub.unsubscribe();
    }
}
