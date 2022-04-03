import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    hide = true;

    LoginForm!: FormGroup
    orientation: any;

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private _snackBar: MatSnackBar, private titleService: TitleServiceService, private loginService: LoginService,
        private localStorageService: LocalstorageService, private router: Router, private notificationService: NotificationServiceService) {
        this.orientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? true : false)));

        this.LoginForm = this._formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.titleService.setTitle("Login");
        document.getElementById('userName').focus()

        if (this.loginService.isLoggedIn()) {
            this.router.navigate(['dashboard']);
        }
    }

    openSnackBar(message: string) {
        let snackBarRef = this._snackBar.open(message, 'OKAY', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
        });
        snackBarRef.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
        });
    }

    usernameBlur() {
        this.hide = true
    }

    PasswordOnEnter(event: any) {
        if (event.keyCode == 13) {
            event.preventDefault()

            if (event.target.value != "" && this.LoginForm.controls.userName.value != "") {
                this.login()
            }
        }
    }

    login() {

        this.loginService.login(this.LoginForm.value)
            .subscribe((res: any) => {
                {
                    this.localStorageService.write('name', res.user.name[0].firstName + ' ' + res.user.name[0].lastName)
                    this.localStorageService.write('userType', res.user.userType);

                    if (!!res.user.srnNumber) this.localStorageService.write('srnNumber', res.user.srnNumber);
                    if (!!res.user.prnNumber) this.localStorageService.write('prnNumber', res.user.prnNumber);
                    if (!!res.user.employmentNumber) this.localStorageService.write('employmentNumber', res.user.employmentNumber);

                    // this.openSnackBar("Logged In Succesfully");
                    this.notificationService.success('Logged in successfully')
                    
                    this.router.navigate(['dashboard']);
                }
            });

        setTimeout(() => {
            document.getElementById("loginButton")?.focus();
            // this.LoginForm.reset()
            this.hide = true;
        }, 1);

        setTimeout(() => {
            document.getElementById("password")?.focus();
        }, 5);
    }

    goToResetPassword() {
        this.router.navigate(['resetpassword']);
    }
}