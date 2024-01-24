import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDataService } from '../services/login-data.service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class NoLoginGuard implements CanActivate {
  constructor(private loginService: LoginDataService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isLogin()) {
        this.router.navigate(['/'])
        return false;
      } else {
        return true;
      }
  }
}
