/*
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisoSubmoduloFacturacion } from 'src/app/compartido/enumeraciones/permiso-submodulo-facturacion.enum';
import { TiposUsuario } from 'src/app/compartido/enumeraciones/tipos-usuario.enum';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { PermisosGlobalesService } from '../servicios/permisos-globales.service';

@Injectable({
    providedIn: 'root'
})
export class PermisoSubmoduloFacturacionGuard implements CanActivate {
    constructor(private _serAutenticacion: AutenticacionService,
        private _serPermisosGlobales: PermisosGlobalesService,
        private enrutador: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let permisoHabilitado: boolean;
        switch (this._serAutenticacion.obtenerTipoUsuario()) {
            case TiposUsuario.Administrador:
                permisoHabilitado = true;
                break;
            case TiposUsuario.Empleado:
                const permisoModuloFacturacion = next.data['permisoModuloFacturacion'] as number;
                switch (permisoModuloFacturacion) {
                    case PermisoSubmoduloFacturacion.CFDI:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDeFacturacionHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloFacturacion.CatalogosDelSAT:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDeFacturacionHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloFacturacion.Clientes:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDeFacturacionHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloFacturacion.Productos:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDeFacturacionHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloFacturacion.RecepcionesDePago:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDeFacturacionHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloFacturacion.Reportes:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDeFacturacionHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                }
                break;
            default:
                permisoHabilitado = false;
                break;
        }
        if (permisoHabilitado) {
            return true;
        } else {
            this.enrutador.navigate(['/not-found']);
            return false;
        }
    }
}*/
