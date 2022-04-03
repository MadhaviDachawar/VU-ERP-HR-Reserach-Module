import { Component, OnInit } from '@angular/core';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { TitleServiceService } from 'src/app/common/services/title/title-service.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private _snackBar: MatSnackBar, private titleService: TitleServiceService) { }

    ngOnInit(): void {
        this.titleService.setTitle("Student");
    }
}