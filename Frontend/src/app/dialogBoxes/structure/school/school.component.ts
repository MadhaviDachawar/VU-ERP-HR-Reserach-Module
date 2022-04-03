import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-school',
    templateUrl: './school.component.html',
    styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<SchoolComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { };

    ngOnInit() {
        if (this.data.action == 'add') {
            this.data = {
                action: this.data.action,
                name: this.data.name,
                type: this.data.type,
                faculty: this.data._id
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
