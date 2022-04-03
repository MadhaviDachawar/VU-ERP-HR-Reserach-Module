import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-faculty',
    templateUrl: './faculty.component.html',
    styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<FacultyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { };

    ngOnInit() {
        if (this.data.action == 'add') {
            this.data = {
                action: this.data.action,
                name: this.data.name,
                type: this.data.type,
                college: this.data._id
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
