import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
/*import UsuarioSocket from 'src/app/compartido/modelos/extra/usuario-socket.model';*/
export default class UsuarioSocket {
  id: string;
  _id: string;
  conectado: boolean;
  tipo: number;
  _idSucursal: string;
  _idEmpresa: string;
  _idAccesoUsuario: string;

  constructor() {
    this.id = '';
    this._id = '';
    this.tipo = -1;
    this.conectado = false;
    this._idSucursal = '';
    this._idEmpresa = '';
    this._idAccesoUsuario = '';
  }

  public nuevoUsuario(_id: string, conectado: boolean, tipo: number, _idSucursal: string, _idEmpresa: string, _idAccesoUsuario: string): UsuarioSocket {
    let usuario = new UsuarioSocket();
    usuario.id = '';
    usuario._id = _id;
    usuario.conectado = conectado;
    usuario.tipo = tipo;
    usuario._idSucursal = _idSucursal;
    usuario._idEmpresa = _idEmpresa;
    usuario._idAccesoUsuario = _idAccesoUsuario;
    return usuario;
  }
}
@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  public estatusSocket = false;
  public usuario: UsuarioSocket;

  constructor(private socket: Socket) {
    /*this.cargarAlmacenamientoLocal();*/
    this.verificarEstatus();
  }

  verificarEstatus() {
    this.socket.on('connect', () => {
      this.estatusSocket = true;
    })
    this.socket.on('disconnect', () => {
      this.estatusSocket = false;
    })
  }

  emitir(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  escuchar(evento: string) {
    return this.socket.fromEvent(evento);
  }

  /*iniciarSesionWS(usuario: UsuarioSocket) {
    return new Promise<void>((resolve, reject) => {
      this.emitir('actualizando-usuario', usuario, resp => {
        this.usuario = usuario;
        this.guardarAlmacenamientoLocal();
        resolve();
      });
    });
  }*/

  cerrarSesionWS() {
    return new Promise<void>((resolve, reject) => {
      this.emitir('cerrar-sesion', this.usuario, resp => {
        localStorage.removeItem('token_aut');
        resolve();
      });
    });
  }

  /*guardarAlmacenamientoLocal() {
    localStorage.setItem('usr-swws', JSON.stringify(this.usuario));
  }*/

  /*cargarAlmacenamientoLocal() {
    if (localStorage.getItem('usr-swws')) {
      this.usuario = JSON.parse(localStorage.getItem('usr-swws'));
      this.iniciarSesionWS(this.usuario);
    }
  }*/

  /*obtenerUsuarioSocket() {
    return this.usuario;
  }*/

}
