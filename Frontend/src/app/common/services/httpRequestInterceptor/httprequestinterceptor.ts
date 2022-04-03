import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localStorage/localstorage.service';
import { NotificationServiceService } from '../notification/notification-service.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    count = 0;

    constructor(private localStorageService: LocalstorageService, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, public router: Router, private notificationService: NotificationServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        this.count++;

        if (request.url === 'api/users' || request.url === 'api/users/resetpassword') {

            let newparams = new HttpParams({
                fromString: request.params.toString(),
            });

            newparams = newparams.append('loginAction', 'skip');

            request = request.clone({
                params: newparams
            });

            return next.handle(request)
                .pipe(tap((event) => {
                    return
                }, (error) => {

                    this.notificationService.error(error.error.message)

                    return
                }), finalize(() => {

                    this.count--;

                    if (this.count == 0) {
                        setTimeout(() => { this.spinner.hide() }, 500);
                    }

                }))
        } else {
            let newparams = new HttpParams({
                fromString: request.params.toString()
            });

            let cookie = new HttpHeaders({ "set-cookie": document.cookie })

            newparams = newparams.append('loginAction', 'loggedInUser');

            newparams = newparams.append('name', this.localStorageService.read('name').toString());
            newparams = newparams.append('userType', this.localStorageService.read('userType').toString());

            request = request.clone({
                headers: cookie,
                params: newparams,
            });

            return next.handle(request)
                .pipe(tap((event) => {
                    return
                },
                    (error) => {

                        console.log(error)

                        this.notificationService.error(error.error.message)

                        if (error.status > 399 && error.status < 500) {
                            localStorage.clear();
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            this.router.navigate(["login"])
                        }
                        return
                    }
                ), finalize(() => {

                    this.count--;

                    if (this.count == 0) this.spinner.hide()
                }))
        }
    }
}