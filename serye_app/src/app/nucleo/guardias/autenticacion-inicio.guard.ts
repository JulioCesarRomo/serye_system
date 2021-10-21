import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionInicioGuard implements CanActivate {
  constructor(
      private _serAutenticacion: AutenticacionService,
      private enrutador: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._serAutenticacion.obtenerToken()) {
      this.enrutador.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
