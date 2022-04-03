import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DepartmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { };

    ngOnInit() {
        if (this.data.action == 'add') {
            this.data = {
                action: this.data.action,
                name: this.data.name,
                type: this.data.type,
                _id: this.data._id,
                faculty: this.data.faculty._id,
                school: this.data._id
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
