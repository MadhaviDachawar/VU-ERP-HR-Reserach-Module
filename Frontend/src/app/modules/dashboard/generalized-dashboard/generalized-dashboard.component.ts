import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';
import { LoginService } from 'src/app/components/login/login.service';

@Component({
  selector: 'app-generalized-dashboard',
  templateUrl: './generalized-dashboard.component.html',
  styleUrls: ['./generalized-dashboard.component.scss']
})
export class GeneralizedDashboardComponent implements OnInit {

  name = this.localStorageService.read('name');
  userType = this.localStorageService.read('userType');

  constructor(private localStorageService: LocalstorageService, private loginService: LoginService) {

    if (this.name == null || typeof (this.userType) != 'number') {
      this.loginService.corruptedSession()
    }
  }

  ngOnInit() { }

}