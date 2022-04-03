import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from './components/login/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent {
    title = 'VUERP';

    constructor(private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService, private titleService: Title) { }

    ngOnInit() {

        this.titleService.setTitle("VUERP");

        // Show spinner
        // this.spinner.show();

        // Hide spinner
        // setTimeout(() => {
        //     this.spinner.hide();
        // }, 6000);

    }
}