import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDataService } from '../services/login-data.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectGuard implements CanActivate {
  constructor(private loginService: LoginDataService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginService.verifyLogin().subscribe((data) => {
      if (!data.value) {
        this.loginService.loggout();
      }
    })
    if (!this.loginService.isLogin()) {
      this.router.navigate(['login']);
      return false;
    } else {
      // Obtener el idProject de la URL actual
      const idProject = route.paramMap.get('idProject');

      // Verificar si ya estamos en la ruta hija "all"
      if (state.url.includes('/all')) {
        return true; // Si ya estamos en "all", permitimos la activación de la ruta
      } else {
        // Si hay un idProject en la URL, redirige a la ruta "all" bajo esa ruta de proyecto
        if (idProject) {
          this.router.navigate(['project', idProject, 'all']);
          return false; // Redireccionado, devuelve false para evitar que la ruta original se active
        } else {
          return true; // Si no hay idProject en la URL, permite que la ruta original se active
        }
      }
    }
  }
}