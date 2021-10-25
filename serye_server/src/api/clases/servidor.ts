//DECLARACIÓN DE INSTANCIAS RELACIONADAS CON EL SERVIDOR Y SU INICIALIZACIÓN
import express from 'express';
import http from 'http';
import https from 'https';
import {OPCIONES, PUERTO_SERVIDOR} from '../../config/globales';
import categoriasRutas from "../componentes/rutas/categorias";
import inicioRutas from "../componentes/rutas/inicio";
import autenticacionRutas from "../componentes/rutas/autenticacion";
import usuariosRutas from "../componentes/rutas/usuarios";
export default class Servidor {
  private static _instance: Servidor;
  public app: express.Application;
  public puerto: number;
  // DESARROLLO
  private servidorHttp: http.Server;
  // PRODUCCIÓN
  private servidorHttps: https.Server;

  private constructor() {
    this.app = express();
    this.puerto = PUERTO_SERVIDOR;
    // DESARROLLO
    this.servidorHttp = new http.Server(this.app);
    // PRODUCCIÓN
    this.servidorHttps = new https.Server(OPCIONES, this.app);
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  // RUTAS DEL SERVIDOR E INICIALIZADORES DE LAS MISMAS
  private inicializarRutas() {
    this.app.use('/api/v1/inicio', inicioRutas);
    this.app.use('/api/v1/usuarios', usuariosRutas);
    this.app.use('/api/v1/categorias', categoriasRutas);
    this.app.use('/api/v1/autenticacion', autenticacionRutas);
  }

  // FUNCIÓN QUE INICIALIZA EL SERVIDOR (UTILIZADA EN "principal.ts")
  public iniciar() {
    this.inicializarRutas();
    this.servidorHttp.listen(this.puerto, () => {console.log(`Servidor funcionando en el puerto ${this.puerto}`);})
    //this.servidorHttps.listen(this.puerto, () => {console.log(`Servidor seguro funcionando en el puerto ${this.puerto}`);})
  }
}
