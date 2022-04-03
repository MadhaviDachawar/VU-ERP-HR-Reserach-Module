import { Component, ɵisObservable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';
import { BehaviorSubject } from 'rxjs';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

    orientation: any;
    hide = true
    toggleOn = false
    timerClockBS = new BehaviorSubject("2:00")
    timeOut = null

    otpToken: string = ""

    ResetForm!: FormGroup
    otpPasswordForm!: FormGroup

    interval: any;

    constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private _snackBar: MatSnackBar, private titleService: TitleServiceService, private loginService: LoginService,
        private localStorageService: LocalstorageService, private router: Router, private notificationService: NotificationServiceService) {
        this.orientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? true : false)));

        this.ResetForm = this._formBuilder.group({
            userName: ['', Validators.required],
            otp: [''],
            password: [''],
            passwordAgain: ['']
        })

    }

    ngOnInit(): void {
        this.titleService.setTitle("Reset Password");
        document.getElementById('userName').focus()

        if (this.loginService.isLoggedIn()) {
            this.router.navigate(['dashboard']);
        }
    }

    countdown() {
        this.timerClockBS.next("2:00")
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            var timer = this.timerClockBS.getValue().split(":")
            var minutes = parseInt(timer[0]);
            var seconds = parseInt(timer[1]);

            seconds -= 1;
            if (minutes < 0) return;
            else if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            }
            else if (seconds < 10 && seconds.toString().length != 2) seconds = 0 + seconds;

            if (seconds < 10) {
                this.timerClockBS.next(minutes + ':' + '0' + seconds)

            } else {
                this.timerClockBS.next(minutes + ':' + seconds)
            }

            if (minutes == 0 && seconds == 0) clearInterval(this.interval);
        }, 1000);

    }

    ResetOnEnter(event: any) {
        if (event.keyCode == 13 && event.target.value != "" && this.ResetForm.controls.userName.value != "") {
            this.hide = true
            event.preventDefault()
            this.reset()
        }
    }

    goBackToPassword() {
        this.router.navigate(['login']);
    }

    otp() {
        this.loginService.sendOTP(this.ResetForm.controls.userName.value).subscribe((res: any) => {
            {
                this.countdown()
                this.toggleOn = !this.toggleOn
                this.otpToken = res.token

                this.notificationService.success("OTP sent to email succesfully!")

                setTimeout(() => {
                    document.getElementById("otp")?.focus();
                }, 1);

                this.ResetForm.controls.otp.setValidators([Validators.required]);
                this.ResetForm.controls.password.setValidators([Validators.required]);
                this.ResetForm.controls.passwordAgain.setValidators([Validators.required]);

                // auto reset form after 2 mins of not doing anything
                this.timeOut = setTimeout(() => {
                    if (this.toggleOn) {
                        this.toggleOn = !this.toggleOn
                        this.ResetForm.controls.otp.setValidators([]);
                        this.ResetForm.controls.password.setValidators([]);
                        this.ResetForm.controls.passwordAgain.setValidators([]);
                        document.getElementById("userName")?.focus();
                        this.ResetForm.reset()
                        this.otpToken = ""
                        this.notificationService.warning("Time expired. Request OTP again!")
                    }
                }, 120000);
            }
        }, error => {
            document.getElementById("userName")?.focus();
        });
    }

    reset() {
        if (this.ResetForm.controls.password.value === this.ResetForm.controls.passwordAgain.value) {
            this.loginService.resetPassword({
                userName: this.ResetForm.controls.userName.value,
                password: this.ResetForm.controls.password.value,
                otp: this.ResetForm.controls.otp.value,
                otpToken: this.otpToken
            }).subscribe((res: any) => {
                {
                    this.toggleOn = !this.toggleOn
                    this.ResetForm.controls.otp.setValidators([]);
                    this.ResetForm.controls.password.setValidators([]);
                    this.ResetForm.controls.passwordAgain.setValidators([]);
                    document.getElementById("userName")?.focus();
                    this.ResetForm.reset()
                    this.otpToken = ""
                    this.notificationService.success("Password changed succesfully. Redirecting to login page...")
                    setTimeout(() => {
                        this.router.navigate(['login']);
                    }, 3000);
                }
            });
        } else if (this.ResetForm.controls.password.value == "" || this.ResetForm.controls.passwordAgain.value == "") {
            this.notificationService.error("Password can not be empty!")
        }
        else {
            this.notificationService.error("Passwords do not match!")
        }
    }

    ngOnDestroy() {
        clearTimeout(this.timeOut)
    }
}