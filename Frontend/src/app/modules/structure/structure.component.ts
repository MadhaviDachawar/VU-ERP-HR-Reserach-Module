import { Component, OnInit } from '@angular/core';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';

@Component({
    selector: 'app-structure',
    templateUrl: './structure.component.html',
    styleUrls: ['./structure.component.scss']
})

export class StructureComponent implements OnInit {

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private _snackBar: MatSnackBar, private titleService: TitleServiceService) {
    }

    ngOnInit(): void {
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
