import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AjustesAplicacion } from 'src/app/compartido/constantes/ajustes-aplicacion';
import { Cliente } from 'src/app/compartido/modelos/cliente.model';
import {FuncionesGeneralesService} from "./funcionesGenerales.service";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpClient: HttpClient, private _serFuncionesGenerales: FuncionesGeneralesService) { }

  /* GET */
  public obtenerNumClientes(activo: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/num-clientes?activo=${activo}`, AjustesAplicacion.Opciones);
  }

  public obtenerNumClientesFiltrados(filtro: string, activo?: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/num-clientes-filtro?filtro=${filtro}&activo=${activo}`, AjustesAplicacion.Opciones);
  }

  public obtenerClientes(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'clientes', AjustesAplicacion.Opciones);
  }

  public obtenerClientesInactivos(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'clientes/inactivos', AjustesAplicacion.Opciones);
  }

  public obtenerCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}`, AjustesAplicacion.Opciones);
  }

  public obtenerEstadoActualDeCreditoCliente(_idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${_idCliente}/estado-actual-de-credito`, AjustesAplicacion.Opciones);
  }

  public obtenerInfoGeneralCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/informacion-general`, AjustesAplicacion.Opciones);
  }

  public obtenerDireccionEnvioCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/direccion-envio`, AjustesAplicacion.Opciones);
  }

  public obtenerDatosFiscalesCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/datos-fiscales`, AjustesAplicacion.Opciones);
  }

  public obtenerInfoContactoCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/informacion-de-contacto`, AjustesAplicacion.Opciones);
  }

  public obtenerFotografiaCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/foto`, AjustesAplicacion.Opciones);
  }

  public obtenerRestriccionDeUsuariosCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/restriccion-de-usuarios`, AjustesAplicacion.Opciones);
  }

  public obtenerListaPreciosCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/lista-precios`, AjustesAplicacion.Opciones);
  }

  public obtenerLimiteDeCreditoCliente(idCliente: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/limite-de-credito`, AjustesAplicacion.Opciones);
  }

  public obtenerClientesFiltrados(filtro: string, inicio?: number, fin?: number, activo?: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/filtro?filtro=${filtro}&activo=${activo}&inicio=${inicio}&fin=${fin}`, AjustesAplicacion.Opciones);
  }

  public verificarRfcExistente(rfc: string, _idExcluido?: string): Observable<any> {
    if (_idExcluido) return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/rfc-existente?rfc=${rfc}&_idExcluido=${_idExcluido}`, AjustesAplicacion.Opciones);
    else return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/rfc-existente?rfc=${rfc}`, AjustesAplicacion.Opciones);
  }

  public verificarRfcExistenteKiosco(rfc: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/rfc-existente-kiosco?rfc=${rfc}`, AjustesAplicacion.Opciones);
  }

  public obtenerInformacionClienteKiosco(rfc: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/informacion-cliente-kiosco?rfc=${rfc}`, AjustesAplicacion.Opciones);
  }

  public obtenerClientePorDefecto() {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'clientes/defecto', AjustesAplicacion.Opciones);
  }

  /*public obtenerClientesSinMembresias(filtro: string, inicio: number, fin: number): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/membresias?filtro=${filtro}&inicio=${inicio}&fin=${fin}&zonaHoraria=${this._serFuncionesGenerales.obtenerZonaHorariaActual()}`, AjustesAplicacion.Opciones);
  }*/

  public obtenerClientesConRestriccionDeUsuarios(filtro: string, inicio?: number, fin?: number, activo?: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `clientes/restriccion-de-usuarios?filtro=${filtro}&activo=${activo}&inicio=${inicio}&fin=${fin}`, AjustesAplicacion.Opciones);
  }

  /* POST */
  public guardarClienteGenerico(cliente: Cliente, idSucursal: string): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + `clientes/generico/${idSucursal}`, cliente, AjustesAplicacion.Opciones);
  }
  public guardarCliente(cliente: Cliente): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + `clientes`, cliente, AjustesAplicacion.Opciones);
  }

  /* PUT */
  public actualizarCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}`, cliente, AjustesAplicacion.Opciones);
  }

  /* PATCH */
  public actualizarEstadoCliente(idCliente: string, activo: boolean): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}`, { activo }, AjustesAplicacion.Opciones);
  }

  public actualizarFotografiaCliente(idCliente: string, foto: FormData): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/foto`, foto);
  }

  public actualizarInfoGeneralCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/informacion-general`, cliente, AjustesAplicacion.Opciones);
  }

  public actualizarDireccionEnvioCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/direccion-envio`, cliente, AjustesAplicacion.Opciones);
  }

  public actualizarDatosFiscalesCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/datos-fiscales`, cliente, AjustesAplicacion.Opciones);
  }

  public actualizarInfoContactoCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/informacion-de-contacto`, cliente, AjustesAplicacion.Opciones);
  }

  public actualizarListaPreciosCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/lista-precios`, cliente, AjustesAplicacion.Opciones);
  }

  public actualizarLimiteDeCreditoCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/limite-de-credito`, cliente, AjustesAplicacion.Opciones);
  }

  public actualizarRestriccionDeUsuariosCliente(idCliente: string, cliente: Cliente): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `clientes/${idCliente}/restriccion-de-usuarios`, cliente, AjustesAplicacion.Opciones);
  }

}
