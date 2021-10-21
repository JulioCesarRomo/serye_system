import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as momento from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AjustesAplicacion } from '../../compartido/constantes/ajustes-aplicacion';
import { WebSocketsService } from './web-sockets.service';

const jwt = new JwtHelperService();
class Token {
  ext: number = 0;
  name: string = '';
}
class Login {
  correoUsuario = '';
  contrasena: string;
}
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private tokenDesencriptado;

  constructor(private httpClient: HttpClient, private wsService: WebSocketsService) {
    this.tokenDesencriptado = jwt.decodeToken(localStorage.getItem('token_aut'));
  }

  /* GET */
  public obtenerModuloActivoUsuario(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'autenticacion/sesion/modulo-activo');
  }

  /* POST */
  public iniciarSesionUsuario(loginUsuario: Login): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'autenticacion/iniciar-sesion', loginUsuario, AjustesAplicacion.Opciones).pipe(
      map((token: string) => {
        this.guardarToken(token)
      })
    );
  }

  /* PUT */

  /* PATCH */
  public cerrarSesionUsuario() {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'autenticacion/sesion', null, AjustesAplicacion.Opciones);
  }

  public enviarCodigoRecuperacion(usuario: string) {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'autenticacion/codigo-recuperacion', { usuario }, AjustesAplicacion.Opciones);
  }

  /* MÉTODOS GENERALES */
  private guardarToken(token: string): string {
    this.tokenDesencriptado = jwt.decodeToken(token);
    localStorage.setItem('token_aut', token);
    return token;
  }
  public obtenerToken() {
    return localStorage.getItem('token_aut');
  }

  public obtenerTokenDesencriptado() {
    return this.tokenDesencriptado;
  }

  public obtener_IdUsuario(): string {
    return this.tokenDesencriptado._id;
  }

  public obtenerTipoUsuario(): number {
    return this.tokenDesencriptado.tipo;
  }

  public obtener_IdAccesoUsuario(): string {
    return this.tokenDesencriptado._idAccesoUsuario;
  }

  public obtenerNombre(): string {
    return this.tokenDesencriptado.nombre;
  }

  public obtenerApepat(): string {
    return this.tokenDesencriptado.apepat;
  }

  public obtenerApemat(): string {
    return this.tokenDesencriptado.apemat;
  }

  public obtenerNombreDeUsuario(): string {
    return this.tokenDesencriptado.usuario;
  }

  public destruirToken() {
    localStorage.removeItem('token_aut');
    this.tokenDesencriptado = new Token();
  }

  private obtenerExpiracionToken() {
    return momento.unix(this.tokenDesencriptado.exp);
  }

  public estaAutenticado(): boolean {
    return momento().isBefore(this.obtenerExpiracionToken());
  }

  /* SOCKETS */
  public existeSesionPreviaUsuario() {
    return this.wsService.escuchar('existe-sesion-previa-usuario');
  }
}
