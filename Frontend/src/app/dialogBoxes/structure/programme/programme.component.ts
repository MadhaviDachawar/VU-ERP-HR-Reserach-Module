import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-programme',
    templateUrl: './programme.component.html',
    styleUrls: ['./programme.component.scss']
})
export class ProgrammeComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ProgrammeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { };


    ngOnInit() {
        if (this.data.action == 'add') {
            console.log(this.data);

            this.data = {
                faculty : this.data.faculty._id,
                school : this.data.school._id,
                department : this.data._id,
                action: this.data.action,
                name: this.data.name,
                type: this.data.type,
                _id: this.data._id
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