import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
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

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export interface Experience {
    NameOfEmployer: string;
    Position: string;
    LastSalaryDrawn: number;
    From: Date;
    To: Date;
    ExperienceType: string;
    RolesNResponsibilities: string;
    AdditionalInformation: string;
    Remarks: string;
}

@Component({
    selector: 'app-experience-details',
    templateUrl: './experience-details.component.html',
    styleUrls: ['./experience-details.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class ExperienceDetailsComponent implements OnInit {
    ExperienceDetails!: FormGroup;
    editPosition: number | undefined = undefined;
    displayedColumns: string[] = [
        'NameOfEmployer',
        'Position',
        'LastSalaryDrawn',
        'From',
        'To',
        'ExperienceType',
        'RolesNResponsibilities',
        'AdditionalInformation',
        'Remarks',
        'Edit',
        'Delete',
    ];
    dataSource: MatTableDataSource<Experience>;

    constructor(private _formBuilder: FormBuilder) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.ExperienceDetails = this._formBuilder.group({
            NameOfEmployer: [''],
            Position: [''],
            LastSalaryDrawn: [''],
            From: [''],
            To: [''],
            ExperienceType: [''],
            RolesNResponsibilities: [''],
            AdditionalInformation: [''],
            Remarks: [''],
        });
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let exp: Experience = this.dataSource.data[this.editPosition];
        this.ExperienceDetails = this._formBuilder.group({
            NameOfEmployer: [exp.NameOfEmployer],
            Position: [exp.Position],
            LastSalaryDrawn: [exp.LastSalaryDrawn],
            From: [exp.From],
            To: [exp.To],
            ExperienceType: [exp.ExperienceType],
            RolesNResponsibilities: [exp.RolesNResponsibilities],
            AdditionalInformation: [exp.AdditionalInformation],
            Remarks: [exp.Remarks],
        });
    }

    addOtherInformation() {
        const newRow: Experience = {
            NameOfEmployer: this.ExperienceDetails.controls.NameOfEmployer.value,
            Position: this.ExperienceDetails.controls.Position.value,
            LastSalaryDrawn: this.ExperienceDetails.controls.LastSalaryDrawn.value,
            From: this.ExperienceDetails.controls.From.value,
            To: this.ExperienceDetails.controls.To.value,
            ExperienceType: this.ExperienceDetails.controls.ExperienceType.value,
            RolesNResponsibilities:
                this.ExperienceDetails.controls.RolesNResponsibilities.value,
            AdditionalInformation:
                this.ExperienceDetails.controls.AdditionalInformation.value,
            Remarks: this.ExperienceDetails.controls.Remarks.value,
        };

        if (this.editPosition !== undefined) {
            this.dataSource.data[this.editPosition] = { ...newRow };
            this.editPosition = undefined;
        } else {
            this.dataSource.data.push(newRow);
        }
        this.dataSource.filter = '';
        this.ExperienceDetails.reset();
    }

    deleteOtherInformation(rowID: number) {
        this.dataSource.data.splice(rowID, 1);
        this.dataSource.filter = '';
    }
}
