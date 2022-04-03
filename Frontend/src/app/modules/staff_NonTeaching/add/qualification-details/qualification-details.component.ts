import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface Qualification {
    Examination: string;
    University: string;
    PassingYear: string;
    Marks: number;
    Percentage: number;
    Grade: string;
    Class: string;
    Remarks: string;
}

@Component({
    selector: 'app-qualification-details',
    templateUrl: './qualification-details.component.html',
    styleUrls: ['./qualification-details.component.scss']
})
export class QualificationDetailsComponent implements OnInit {

    QualificationDetails!: FormGroup;

    Examinations = ['SSC','HSC','Diploma (if applicable)','Graduation','Post Graduation','Post-Graduate Diploma (if applicable)','SET/NET (if applicable)','JRF/SRF (if applicable)','M.Phil. (if applicable)','PhD','Post-Doctoral'];

    displayedColumns: string[] = [
        "Examination",
        "University",
        "PassingYear",
        "Marks",
        "Percentage",
        "Grade",
        "Class",
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
            Examination: [''],
            University: [''],
            PassingYear: [''],
            Marks: [''],
            Percentage: [''],
            Grade: [''],
            Class: [''],
            Remarks: [''],
        });
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let q: Qualification = this.dataSource.data[this.editPosition];
        this.QualificationDetails = this._formBuilder.group({
            Examination: [q.Examination],
            University: [q.University],
            PassingYear: [q.PassingYear],
            Marks: [q.Marks],
            Percentage: [q.Percentage],
            Grade: [q.Grade],
            Class: [q.Class],
            Remarks: [q.Remarks],
        });
    }

    addOtherInformation() {
        let exam_name = "";
        if(this.QualificationDetails.controls.Examination.value){
            exam_name = this.QualificationDetails.controls.Examination.value.split("(if applicable)")[0];
        }
        const newRow: Qualification = {
            // Examination: this.QualificationDetails.controls.Examination.value,
            Examination: exam_name,
            University: this.QualificationDetails.controls.University.value,
            PassingYear: this.QualificationDetails.controls.PassingYear.value,
            Marks: this.QualificationDetails.controls.Marks.value,
            Percentage: this.QualificationDetails.controls.Percentage.value,
            Grade: this.QualificationDetails.controls.Grade.value,
            Class: this.QualificationDetails.controls.Class.value,
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
