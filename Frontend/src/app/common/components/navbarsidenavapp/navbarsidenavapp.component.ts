import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/components/login/login.service';
import { LocalstorageService } from '../../services/localStorage/localstorage.service';
import { map } from 'rxjs/operators';
import { TitleServiceService } from '../../services/title/title-service.service';
import { Router } from '@angular/router';

import { staffMenu } from './Menus/staffMenu';
import { studentMenu } from './Menus/studentMenu';

@Component({
    selector: 'app-navbarsidenavapp',
    templateUrl: './navbarsidenavapp.component.html',
    styleUrls: ['./navbarsidenavapp.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarsidenavappComponent implements AfterViewInit {

    SideNavOpen: boolean = false;
    mode = new FormControl('side');
    name: string = "";
    pageName: any;
    orientation: any;

    userType = this.localStorageService.read('userType')
    panelOpenState = false;
    subPanelOpenState = false;
    navList = [];
    allowedList = [];

    constructor(private router: Router, breakpointObserver: BreakpointObserver, private localStorageService: LocalstorageService, private titleService: TitleServiceService, private loginService: LoginService) {
        this.orientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? true : false)));
    }

    ngAfterViewInit(): void {

        this.name = this.localStorageService.read('name');
        this.titleService.getTitle().subscribe(title => this.pageName = title)

        let userType = this.localStorageService.read('userType')

        if ([1, 2, 3, 4, 5].includes(userType))
            this.navList = staffMenu
        else if ([6, 7].includes(userType))
            this.navList = studentMenu

    }

    redirectTo(url: string) {
        this.router.navigate([url])
        this.SideNavOpen = false
    }

    editProfile() {
        let srnNumber = this.localStorageService.read('srnNumber')

        if (!!srnNumber) {
            this.localStorageService.write("srnNumber", srnNumber)
            this.router.navigate(['/student/profile'])
        } else {
            let employmentNumber = this.localStorageService.read('employmentNumber')

            this.localStorageService.write("employmentNumber", employmentNumber)
            this.router.navigate(['/staff/profile'])
        }
    }

    logout() {
        this.loginService.logout();
    }
}