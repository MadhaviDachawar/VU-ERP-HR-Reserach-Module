import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-programmedatayearly',
    templateUrl: './programmedatayearly.component.html',
    styleUrls: ['./programmedatayearly.component.scss']
})

//app\dialogBoxes\structure\programmedatayearly\programmedatayearly.component.html

export class ProgrammeDataYearlyComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ProgrammeDataYearlyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { };


    ngOnInit() {
        
        console.log(this.data.action);
        console.log(this.data.action.length);

        if (this.data.action == 'add') {
            console.log(this.data);

            this.data = {
                faculty: this.data.faculty._id,
                school: this.data.school._id,
                department: this.data.department._id,
                programme: this.data._id,
                type: this.data.type,
                action: this.data.action,
                name: this.data.name,
                // new data
                SanctionedIntake: this.data.SanctionedIntake,
                TotalAdmittedStudents: this.data.TotalAdmittedStudents,
                Fees: this.data.Fees,
                duration:this.data.duration,
                AcademicYear : this.data.AcademicYear,
                _id: this.data._id,
            }
        }
        else {
            this.data.newName = this.data.name
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}