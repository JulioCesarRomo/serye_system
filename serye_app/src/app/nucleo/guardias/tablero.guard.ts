import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import {TiposUsuario} from "../../compartido/enumeraciones/tipos-usuario.enum";

@Injectable({
    providedIn: 'root'
})
export class TableroGuard implements CanActivate {
    constructor(private _serAutenticacion: AutenticacionService,
        private enrutador: Router) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        let ruta: string = '';
        switch (this._serAutenticacion.obtenerTipoUsuario()) {
            case TiposUsuario.Root:
            case TiposUsuario.Soporte:
            case TiposUsuario.Vendedor:
                ruta = '/inicio/tablero';
                break;
            case TiposUsuario.Administrador:
            case TiposUsuario.Empleado:
                if (localStorage.getItem('sucursal_activa')) {
                    ruta = this.obtenerRutaModulo(await this.obtenerModuloActivoUsuario());
                } else if (localStorage.getItem('empresa_activa')) {
                    ruta = '/inicio/administracion-empresa/tablero';
                } else if (!localStorage.getItem('sucursal_activa') && !localStorage.getItem('empresa_activa')) {
                    ruta = '/inicio/administracion-cuenta/tablero';
                }
                break;
            // case TiposUsuario.Empleado:
            //     ruta = this.obtenerRutaModulo(await this.obtenerModuloActivoUsuario());
            //     break;
        }
        if (ruta == '') {
            return true;
        } else {
            this.enrutador.navigate([ruta]);
            return false;
        }
    }

    obtenerRutaModulo(tipoModulo: number): any {
        switch (tipoModulo) {
            /*case TiposModulos.Facturacion:
                return '/inicio/finanzas';
            case TiposModulos.PuntoVenta:
                return '/inicio/punto-venta';
            default:
                return '';*/
        }
    }

    obtenerModuloActivoUsuario(): Promise<number | null> {
        return new Promise<number | null>((resolve, reject) => {
            this._serAutenticacion.obtenerModuloActivoUsuario().subscribe(
                (usuario: any) => {
                    resolve(usuario.moduloActivo);
                },
                (err: HttpErrorResponse) => {
                    resolve(null);
                }
            );
        })
    }
}
