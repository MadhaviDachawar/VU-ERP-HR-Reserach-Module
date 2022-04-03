import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/common/services/common/common.service';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';
import { AccountsService } from '../../accounts.service';
import { ProgrammeService } from 'src/app/common/services/programme/programme.service';

interface feeType {
    feeType: string;
    amount: number;
}

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) programme: MatAutocompleteTrigger;

    feeStructure!: FormGroup;
    feeBifurbigation!: FormGroup;

    dataSource: MatTableDataSource<feeType>;
    editPosition: number | undefined = undefined;

    displayedColumns: string[] = ['feeType', 'amount', 'edit', 'delete'];

    /** Gets the total cost of all fee types*/
    getTotalCost() {
        return this.dataSource.data.map(t => t.amount).reduce((acc, value) => Number(acc) + Number(value), 0);
    }

    pSub: Subscription;
    options = [];
    filteredProgrammes: Observable<any[]>;
    years = [];

    constructor(
        private _formBuilder: FormBuilder,
        private programmeService: ProgrammeService,
        private titleService: TitleServiceService,
        public commonService: CommonService,
        private notificationService: NotificationServiceService,
        private accountsService: AccountsService
    ) {
        this.dataSource = new MatTableDataSource();
    }

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

    ngAfterViewInit() {
        // document.getElementById('programme').focus()
        let year = new Date().getFullYear().toString()
        this.feeStructure.get('academicYear').patchValue(year)
    }

    selectValue(event: any) {
        event.path[0].select()
    }

    ngOnInit(): void {

        this.accountsService.getFeeStructures().subscribe(res => {
        })

        this.feeStructure = this._formBuilder.group({
            academicYear: ['', Validators.required],
            programme: ['', Validators.required],
            faculty: ['', Validators.required],
            school: ['', Validators.required],
            department: ['', Validators.required],
            configurationName: ['Default', Validators.required],
            year: ['', Validators.required]
        });

        this.feeBifurbigation = this._formBuilder.group({
            feeType: [null],
            amount: [null]
        })

        this.feeStructure.get('academicYear').valueChanges.subscribe(value => {
            if (value.length == 4) {
                this.feeStructure.get('academicYear').patchValue(this.feeStructure.get('academicYear').value + (Number(this.feeStructure.get('academicYear').value) + 1))
            }
            if (value.length == 7) {
                this.feeStructure.get('academicYear').patchValue("")
            }
        })

        this.pSub = this.programmeService.getProgrammes().subscribe((data) => {

            this.options = data.map((programme) => ({
                _id: programme._id,
                faculty: programme.faculty.name,
                facultyId: programme.faculty._id,
                school: programme.school.name,
                schoolId: programme.school._id,
                department: programme.department.name,
                departmentId: programme.department._id,
                name: programme.name,
                duration: programme.duration
            }))

            this.filteredProgrammes = this.feeStructure.controls.programme.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );

        })

        this.feeStructure.controls.programme.valueChanges.subscribe((value) => {

            let filteredArray = this.options.filter(x => x.name == value)

            if (filteredArray.length != 0 && filteredArray.length != this.options.length) {

                this.programmeId.setValue(filteredArray[0]["_id"])

                this.facultyId.setValue(filteredArray[0].facultyId)
                this.feeStructure.controls.faculty.setValue(filteredArray[0].faculty)

                this.schoolId.setValue(filteredArray[0].schoolId)
                this.feeStructure.controls.school.setValue(filteredArray[0].school)

                this.departmentId.setValue(filteredArray[0].departmentId)
                this.feeStructure.controls.department.setValue(filteredArray[0].department)

                for (let i = 0; i < filteredArray[0].duration; i++) {
                    this.years.push(this.commonService.numberToWords(i + 1) + ' Year')
                }

                setTimeout(() => {
                    document.getElementById('year').focus()
                }, 1);

            } else {
                this.programmeId.setValue("")
                this.feeStructure.controls.faculty.setValue("")
                this.feeStructure.controls.school.setValue("")
                this.feeStructure.controls.department.setValue("")

                this.years = []
            }
        })
    }

    editFeeType(pos: number): void {
        document.getElementById('feeType').focus()
        this.editPosition = pos;
        let info = this.dataSource.data[this.editPosition];
        this.feeBifurbigation.setValue(info)
    }

    addFeeType() {
        let errors = 0

        const newRow: feeType = {
            feeType: this.feeBifurbigation.get('feeType').value,
            amount: this.feeBifurbigation.get('amount').value
        };

        if (newRow.feeType != null) {
            if (newRow.feeType.length == 0) {
                errors++; this.notificationService.error("Fee type can not be empty")
            }
        } else { errors++; this.notificationService.error("Fee type can not be empty") }

        if (newRow.amount != null) {
            if (newRow.amount.toString() == '') { errors++; this.notificationService.error("Amount can not be empty") }
        } else { errors++; this.notificationService.error("Amount can not be empty") }

        if (errors > 0) return

        if (this.editPosition !== undefined) {
            this.dataSource.data[this.editPosition] = { ...newRow };
            this.editPosition = undefined;
        } else {
            let findRow = this.dataSource.data.find(x => x.feeType == this.feeBifurbigation.get('feeType').value)
            if (!!findRow == false) {
                this.dataSource.data.push(newRow);
            } else {
                this.notificationService.info(this.feeBifurbigation.get('feeType').value + " already exists. Value incremented!")
                findRow.amount = Number(findRow.amount) + Number(this.feeBifurbigation.get('amount').value)
            }
        }

        this.dataSource.filter = '';

        this.feeBifurbigation.reset("")
        document.getElementById('feeType').focus()
    }

    deleteFeeType(rowID: number) {
        this.dataSource.data.splice(rowID, 1);
        this.dataSource.filter = '';
    }

    resetProgramme() {
        this.feeStructure.controls.programme.reset('');
        setTimeout(() => {
            this.programme.openPanel();
        }, 1);
    }

    save() {
        let feeStructure = {}

        feeStructure['academicYear'] = this.feeStructure.value.academicYear
        feeStructure['configurationName'] = this.feeStructure.value.configurationName
        feeStructure['structure'] = this.dataSource.data
        feeStructure['year'] = this.years.indexOf(this.feeStructure.value.year)

        feeStructure['programme'] = this.programmeId.value
        feeStructure['faculty'] = this.facultyId.value
        feeStructure['school'] = this.schoolId.value
        feeStructure['department'] = this.departmentId.value

        this.accountsService.saveFeeStructure(feeStructure).subscribe(res => {
            this.notificationService.success("Saved successfully")
        })
    }

    reset() {
        this.resetProgramme()
        this.feeStructure.get('faculty').reset("")
        this.feeStructure.get('school').reset("")
        this.feeStructure.get('department').reset("")
        this.feeStructure.get('configurationName').reset("Default")
        this.feeStructure.get('year').reset("")

        this.feeBifurbigation.reset("")
        this.dataSource.data = []
        this.dataSource.filter = ''

        document.getElementById('programme').focus()
    }

    ngOnDestroy(): void {
        this.pSub.unsubscribe();
    }

}