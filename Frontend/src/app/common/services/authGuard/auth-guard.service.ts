import { Injectable } from '@angular/core';
import { LoginService } from '../../../components/login/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { LocalstorageService } from '../localStorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
     constructor(private localStorageService: LocalstorageService, public auth: LoginService, public router: Router) {}

     canActivate(route: ActivatedRouteSnapshot): boolean {
          
          const usertype = this.localStorageService.read('userType')

          if (route.data.expectedRole) {
          
               if (!route.data.expectedRole.includes(usertype)) {
                    window.history.back()
                    // this.router.navigate(['login']);
                    return false
               }

          } else {
               if (!this.auth.isLoggedIn()) {
                    this.router.navigate(['login']);
                    return false;
               }
          }
          return true;
     }
}