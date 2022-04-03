import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface Qualification {
    Qualification: string;
    University: string;
    PassingYear: string;
    Marks: number;
    MaxMarks: number;
    Percentage: number;
    Grade: string;
    Class: string;
    Specialization: string;
    Remarks: string;
}

@Component({
    selector: 'app-qualification-details',
    templateUrl: './qualification-details.component.html',
    styleUrls: ['./qualification-details.component.scss']
})
export class QualificationDetailsComponent implements OnInit {

    QualificationDetails!: FormGroup;

    displayedColumns: string[] = [
        "Qualification",
        "University",
        "PassingYear",
        "Marks",
        "MaxMarks",
        "Percentage",
        "Grade",
        "Class",
        "Specialization",
        "Remarks",
        "Edit",
        'Delete'];

    dataSource: MatTableDataSource<Qualification>;
    editPosition: undefined | number = undefined;

    constructor(private _formBuilder: FormBuilder) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.QualificationDetails = this._formBuilder.group({
            Qualification: [''],
            University: [''],
            PassingYear: [''],
            Marks: [''],
            MaxMarks: [''],
            Percentage: [''],
            Grade: [''],
            Class: [''],
            Specialization: [''],
            Remarks: [''],
        });
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let q: Qualification = this.dataSource.data[this.editPosition];
        this.QualificationDetails = this._formBuilder.group({
            Qualification: [q.Qualification],
            University: [q.University],
            PassingYear: [q.PassingYear],
            Marks: [q.Marks],
            MaxMarks: [q.MaxMarks],
            Percentage: [q.Percentage],
            Grade: [q.Grade],
            Class: [q.Class],
            Specialization: [q.Specialization],
            Remarks: [q.Remarks],
        });
    }

    addOtherInformation() {
        const newRow: Qualification = {
            Qualification: this.QualificationDetails.controls.Qualification.value,
            University: this.QualificationDetails.controls.University.value,
            PassingYear: this.QualificationDetails.controls.PassingYear.value,
            Marks: this.QualificationDetails.controls.Marks.value,
            MaxMarks: this.QualificationDetails.controls.MaxMarks.value,
            Percentage: this.QualificationDetails.controls.Percentage.value,
            Grade: this.QualificationDetails.controls.Grade.value,
            Class: this.QualificationDetails.controls.Class.value,
            Specialization: this.QualificationDetails.controls.Specialization.value,
            Remarks: this.QualificationDetails.controls.Remarks.value,
        };
        if (this.editPosition !== undefined) {
            this.dataSource.data[this.editPosition] = { ...newRow };
            this.editPosition = undefined;
        } else {
            this.dataSource.data.push(newRow);
        }
        this.dataSource.filter = "";
        this.QualificationDetails.reset();
    }

    deleteOtherInformation(rowID: number) {
        this.dataSource.data.splice(rowID, 1);
        this.dataSource.filter = "";
    }

}
