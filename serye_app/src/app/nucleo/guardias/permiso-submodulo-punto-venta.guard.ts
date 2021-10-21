/*
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisoSubmoduloPuntoVenta } from 'src/app/compartido/enumeraciones/permiso-submodulo-punto-venta.enum';
import { TiposUsuario } from 'src/app/compartido/enumeraciones/tipos-usuario.enum';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { PermisosGlobalesService } from '../servicios/permisos-globales.service';

@Injectable({
    providedIn: 'root'
})
export class PermisoSubmoduloPuntoVentaGuard implements CanActivate {
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
                const permisoModuloPuntoVenta = next.data['permisoModuloPuntoVenta'] as number;
                switch (permisoModuloPuntoVenta) {
                    case PermisoSubmoduloPuntoVenta.Almacenes:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeAlmacenesDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.AjustesDeInventario:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeAjustesDeInventarioDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Cajas:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeCajasDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Categorias:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeCategoriasDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Clientes:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeClientesDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Colores:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeColoresDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.CotizacionesDeOrdenDeVenta:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeCotizacionesDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Existencias:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.GastosGenerales:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeGastoGeneralDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.ListasDePrecios:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Marcas:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeMarcasDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.UnidadesDeMedida:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeUnidadesDeMedidaDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.MetasDeVentas:
                        permisoHabilitado = this._serAutenticacion.obtenerTipoUsuario() == TiposUsuario.Administrador && this._serPermisosGlobales.permisoDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.MiCaja:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeMiCajaDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Ofertas:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeOfertasDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.OrdenesDeCompra:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeOrdenesDeCompraDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.OrdenesDeVenta:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeOrdenesDeVentaDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Paquetes:
                        permisoHabilitado = this._serPermisosGlobales.permisoDePaquetesDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Productos:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeProductosDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Proveedores:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeProveedoresDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.RecepcionesDeMercancia:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeRecepcionesDeMercanciaDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Reportes:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeReportesDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.TiposDeGastosGenerales:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeTiposDeGastoGeneralDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Transferencias:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeTransferenciasDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Venta:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeVentaTerminalDeAgregarDeOrdenesDeVentaDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva()) || this._serPermisosGlobales.permisoDeVentaTouchDeAgregarDeOrdenesDeVentaDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
                        break;
                    case PermisoSubmoduloPuntoVenta.Volumen:
                        permisoHabilitado = this._serPermisosGlobales.permisoDeVolumenesDeModuloDePuntoDeVentaHabilitado(this._serAutenticacion.obtenerEmpresaActiva(), this._serAutenticacion.obtenerSucursalActiva());
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
