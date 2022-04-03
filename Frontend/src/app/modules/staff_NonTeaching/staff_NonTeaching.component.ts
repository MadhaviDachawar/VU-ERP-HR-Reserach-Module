import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-staff_NonTeaching',
    templateUrl: './staff_NonTeaching.component.html',
    styleUrls: ['./staff_NonTeaching.component.scss']
})

export class StaffComponent implements OnInit {

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private _snackBar: MatSnackBar, private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("VUERP - Staff");
        // this.openSnackBar();)
    }

    openSnackBar() {

        let snackBarRef = this._snackBar.open('Message', 'OKAY', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
        });
        snackBarRef.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
        });
    }
}