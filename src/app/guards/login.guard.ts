import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDataService } from '../services/login-data.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginDataService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.loginService.verifyLogin().subscribe((data) => {
        if(!data.value) {
          this.loginService.loggout();
        }
      })
      if (!this.loginService.isLogin()) {
        this.router.navigate(['login'])
        return false;
      } else {
        return true;
      }
  }
}