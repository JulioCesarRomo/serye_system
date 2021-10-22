import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AjustesAplicacion } from 'src/app/compartido/constantes/ajustes-aplicacion';
import {WebSocketsService} from "./servicios/web-sockets.service";
import {Usuario} from "../compartido/modelos/usuario.model";
//import { CambioContrasena } from 'src/app/compartido/modelos/extra/cambiar-contrasena.model';
//import { Usuario } from 'src/app/compartido/modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient, private wsService: WebSocketsService) { }

  public obtenerUsuarios(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios', AjustesAplicacion.Opciones);
  }

  public obtenerUsuariosInactivos(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/inactivos', AjustesAplicacion.Opciones);
  }

  public obtenerUsuariosAdministradores(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/administradores', AjustesAplicacion.Opciones);
  }

  public obtenerUsuariosAdministradoresSinLicencia(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/administradores/sin-licencia', AjustesAplicacion.Opciones);
  }

  public obtenerUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario, AjustesAplicacion.Opciones);
  }

  public obtenerPerfilUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/perfil', AjustesAplicacion.Opciones);
  }


  public obtenerCantidadFacturasTimbradasUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/cantidad-facturas-timbradas', AjustesAplicacion.Opciones);
  }

  public obtenerCantidadFacturasConErrorUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/cantidad-facturas-con-error', AjustesAplicacion.Opciones);
  }

  public obtenerTotalFoliosUtilizadosCfdiUsuario(idUsuario: string, idFolio: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/folios/' + idFolio + '/total-folios-utilizados-cfdi', AjustesAplicacion.Opciones);
  }

  public obtenerTotalFoliosUtilizadosRecepcionPagosUsuario(idUsuario: string, idFolio: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'sucuusuariosrsales/' + idUsuario + '/folios/' + idFolio + '/total-folios-utilizados-recepcion-pagos', AjustesAplicacion.Opciones);
  }

  public obtenerTotalFacturasDiarioUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/total-facturas-diario', AjustesAplicacion.Opciones);
  }

  public obtenerTotalFacturasMensualUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/total-facturas-mensual', AjustesAplicacion.Opciones);
  }

  public obtenerAdministrandoFoliosUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/administrando-folios', AjustesAplicacion.Opciones);
  }

  public obtenerUsuariosPorSucursal(idSucursal: string, filtro: string, inicio: number, fin: number): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `usuarios/${idSucursal}/filtro?filtro=${filtro}&inicio=${inicio}&fin=${fin}`, AjustesAplicacion.Opciones);
  }

  public actualizarAdministrandoFoliosUsuario(administrandoFolios: boolean): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/administrando-folios', { administrandoFolios }, AjustesAplicacion.Opciones);
  }

  public obtenerInfoGeneralUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/informacion-general', AjustesAplicacion.Opciones);
  }

  public obtenerDireccionUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/direccion', AjustesAplicacion.Opciones);
  }

  public obtenerInfoContactoUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/informacion-de-contacto', AjustesAplicacion.Opciones);
  }

  public obtenerFotografiaUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `usuarios/${idUsuario}/foto`);
  }

  public obtenerHorariosUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/horarios', AjustesAplicacion.Opciones);
  }

  public obtenerInfoGeneralPerfilUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/informacion-general', AjustesAplicacion.Opciones);
  }

  public obtenerDireccionPerfilUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/direccion', AjustesAplicacion.Opciones);
  }

  public obtenerConfiguracionVentaTouchPerfilUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/configuracion/venta-touch', AjustesAplicacion.Opciones);
  }

  public obtenerInfoContactoPerfilUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/informacion-de-contacto', AjustesAplicacion.Opciones);
  }

  public obtenerFotografiaPerfilUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/foto');
  }

  public obtenerEmpresaPerfilUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/empresa');
  }

  public obtenerUsuariosFiltrados(filtro: string, inicio?: number, fin?: number, activo?: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `usuarios/filtro?filtro=${filtro}&activo=${activo}&inicio=${inicio}&fin=${fin}`, AjustesAplicacion.Opciones);
  }

  public obtenerNumUsuariosFiltrados(filtro: string, activo?: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `usuarios/num-usuarios?filtro=${filtro}&activo=${activo}`, AjustesAplicacion.Opciones);
  }

  public obtenerNumUsuarios(activo?: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `usuarios/cont-num-usuarios?activo=${activo}`, AjustesAplicacion.Opciones);
  }

  public obtenerUsuariosConPermisosEnEmpresaActiva(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/permisos-empresa', AjustesAplicacion.Opciones);
  }
  public actualizarEstadoUsuario(idUsuario: string, activo: boolean): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario, { activo }, AjustesAplicacion.Opciones);
  }

  public obtenerLogotipoUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `usuarios/${idUsuario}/logo`);
  }

  public obtenerPermisosUsuario(idUsuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/permisos', AjustesAplicacion.Opciones);
  }

  public existeNombreUsuario(usuario: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'usuarios/nombre-de-usuario?usuario=' + usuario, AjustesAplicacion.Opciones);
  }

  public guardarUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'usuarios', usuario, AjustesAplicacion.Opciones);
  }

  /*public actualizarTemaUsuario(tema: TemaColores): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/personalizacion/tema', tema, AjustesAplicacion.Opciones);
  }*/

  public actualizarInfoGeneralPerfilUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/informacion-general', usuario, AjustesAplicacion.Opciones);
  }

  public actualizarDireccionPerfilUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/direccion', usuario, AjustesAplicacion.Opciones);
  }

  public actualizarInfoContactoPerfilUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/informacion-de-contacto', usuario, AjustesAplicacion.Opciones);
  }

  public actualizarFotografiaPerfilUsuario(foto: FormData): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/foto', foto);
  }

  /*public actualizarContrasenaPerfilUsuario(cambioContrasena: CambioContrasena): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/perfil/contrasena', cambioContrasena, AjustesAplicacion.Opciones);
  }*/

  public actualizarInfoGeneralUsuario(idUsuario: string, usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/informacion-general', usuario, AjustesAplicacion.Opciones);
  }

  public actualizarDireccionUsuario(idUsuario: string, usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/direccion', usuario, AjustesAplicacion.Opciones);
  }


  public actualizarInfoContactoUsuario(idUsuario: string, usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/informacion-de-contacto', usuario, AjustesAplicacion.Opciones);
  }

  public actualizarFotografiaUsuario(idUsuario: string, foto: FormData): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `usuarios/${idUsuario}/foto`, foto);
  }

  public actualizarPermisosUsuario(idUsuario: string, usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/permisos', usuario, AjustesAplicacion.Opciones);
  }

  public actualizarHorariosUsuario(idUsuario: string, usuario: Usuario): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'usuarios/' + idUsuario + '/horarios', usuario, AjustesAplicacion.Opciones);
  }

  public actualizarContrasenasUsuario(idUsuario: string, cuerpo: { correo: string }): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `usuarios/${idUsuario}/contrasena`, cuerpo, AjustesAplicacion.Opciones);
  }

  public actualizarUsuario(idUsuario: string, usuario: Usuario): Observable<any> {
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + `usuarios/${idUsuario}`, usuario, AjustesAplicacion.Opciones);
  }

  //SOCKETS
  public actualizarInfoGeneralUsuarioSockets() {
    return this.wsService.escuchar('actualizar-info-general-usuario');
  }

  public actualizarFotografiaUsuarioSockets() {
    return this.wsService.escuchar('actualizar-fotografia-usuario');
  }

  public actualizarPermisosUsuarioSockets() {
    return this.wsService.escuchar('actualizar-permisos-usuario');
  }
}

