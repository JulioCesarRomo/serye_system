/*
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { WebSocketsService } from '../servicios/web-sockets.service';

@Injectable({
  providedIn: 'root'
})
export class ModuloGuard implements CanActivate {
  constructor(private _serAutenticacion: AutenticacionService,
    private _serPermisosGlobales: PermisosGlobalesService,
    private _serUsuarios: UsuariosService,
    private _serWebSockets: WebSocketsService,
    private _serCargando: CargandoService,
    private _serToastr: ToastrService,
    private enrutador: Router) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let moduloHabilitado: boolean;
    switch (this._serAutenticacion.obtenerTipoUsuario()) {
      case TiposUsuario.Administrador:
        moduloHabilitado = true;
        break;
      case TiposUsuario.Empleado:
        if (this._serPermisosGlobales.permisos == null) {
          try {
            this._serPermisosGlobales.permisos = await this.obtenerPermisosUsuario();
          } catch (error) {
            this._serToastr.error(error.titulo, error.detalles);
          }
        }
        const tipoModulo = next.data['tipoModulo'] as number;
        switch (tipoModulo) {
          case TiposModulos.Catastro:
            moduloHabilitado = this._serPermisosGlobales.permisoDeModuloDeCatastroHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
            break;
          case TiposModulos.Contabilidad:
            moduloHabilitado = this._serPermisosGlobales.permisoDeModuloDeContabilidadHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
            break;
          case TiposModulos.Facturacion:
            moduloHabilitado = this._serPermisosGlobales.permisoDeModuloDeFacturacionHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva())
            break;
          case TiposModulos.Nomina:
            moduloHabilitado = this._serPermisosGlobales.permisoDeModuloDeNominaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva())
            break;
          case TiposModulos.PuntoVenta:
            moduloHabilitado = this._serPermisosGlobales.permisoDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva())
            break;
        }
        break;
      default:
        moduloHabilitado = false;
        break;
    }
    if (moduloHabilitado) {
      return true;
    } else {
      this._serAutenticacion.cerrarSesionUsuario().subscribe(
        (resp: RespuestaPeticion) => {
          this._serWebSockets.cerrarSesionWS().then(
            () => {
              localStorage.removeItem('sucursal_activa');
              localStorage.removeItem('tema-actual');
              this.enrutador.navigate(['/login']);
              this._serCargando.abrirVistaCargando(false);
              this._serToastr.error('No autorizado', 'No se tienen permisos para ingresar a este módulo');
              this._serAutenticacion.destruirToken();
            })

        },
        (err: HttpErrorResponse) => {
          this._serCargando.abrirVistaCargando(false);
          this._serToastr.error(err.error.titulo, err.error.detalles);
        }
      )
      return false;
    }
  }

  obtenerPermisosUsuario() {
    return new Promise<PermisosGlobales>((resolve, reject) => {
      this._serUsuarios.obtenerPermisosUsuario(this._serAutenticacion.obtener_IdUsuario()).subscribe(
        (usuario: Usuario) => {
          resolve(usuario.permisosGlobales);
        },
        (err: HttpErrorResponse) => {
          reject({ titulo: err.error.titulo, detalles: err.error.detalles });
        }
      );
    })
  }
}*/
