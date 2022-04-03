import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    url = 'api/users';
    resetUrl = 'api/users/resetpassword';
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private _snackBar: MatSnackBar,
        private notificationService: NotificationServiceService
    ) { }

    login(user: any): Observable<any> {
        return this.http.post(this.url, user).pipe(
            map((res) => {
                return res;
            })
        );
    }

    isLoggedIn() {
        const token = document.cookie.split('token=')[1]
        return !!token;
    }

    logout() {
        localStorage.clear();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.notificationService.success('Logged out successfully')
        this.router.navigate(['login']);
    }

    corruptedSession() {
        localStorage.clear();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        this.notificationService.warning('Session Corrupted. Please Log in again')

        this.router.navigate(['login']);
    }

    sendOTP(userName: string): Observable<any> {
        return this.http.post(this.resetUrl, { userName: userName }).pipe(
            map((res) => {
                return res;
            })
        );
    }

    resetPassword(passwordOTPToken: object): Observable<any> {
        return this.http.put(this.resetUrl, passwordOTPToken).pipe(
            map((res) => {
                return res;
            })
        );
    }
}