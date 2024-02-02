import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDataService } from '../services/login-data.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class ErrorGuard implements CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if (state.url.includes('error')) {
      // Si la URL ya contiene 'error', no redirigir para evitar el bucle infinito
      return true;
    }

    const encodedUrl = encodeURIComponent(state.url); // Codificar la URL para asegurar el formato correcto
    this.router.navigate([`error`], {queryParams: {status: '400', url: state.url.split('/')[1]}});
    return false;
  }
}