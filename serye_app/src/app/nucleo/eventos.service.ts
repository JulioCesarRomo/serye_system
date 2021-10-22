import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private obtenerMetasDeVentaEvento = new Subject<any>();
  public obtenerMetasDeVentaEventoObservable$ = this.obtenerMetasDeVentaEvento.asObservable();

  private reiniciarIndicePaginadorEvento = new Subject<any>();
  public reiniciarIndicePaginadorEventoObservable$ = this.reiniciarIndicePaginadorEvento.asObservable();

  private obtenerNuevoNumeroElementosEvento = new Subject<any>();
  public obtenerNuevoNumeroElementosEventoObservable$ = this.obtenerNuevoNumeroElementosEvento.asObservable();

  private abrirCerrarBarraDeNavegacionEvento = new Subject<any>();
  public abrirCerrarBarraDeNavegacionEventoObservable$ = this.abrirCerrarBarraDeNavegacionEvento.asObservable();

  private obtenerNuevaCantidadExistenciasEvento = new Subject<any>();
  public obtenerNuevaCantidadExistenciasEventoObservable$ = this.obtenerNuevaCantidadExistenciasEvento.asObservable();

  private cambiarPantallaVentaEvento = new Subject<any>();
  public cambiarPantallaVentaEventoObservable$ = this.cambiarPantallaVentaEvento.asObservable();

  private obtenerNotificacionesEnviadasEvento = new Subject<any>();
  public obtenerNotificacionesEnviadasEventoObservable$ = this.obtenerNotificacionesEnviadasEvento.asObservable();

  private obtenerNuevasNotificacionesEvento = new Subject<any>();
  public obtenerNuevasNotificacionesEventoObservable$ = this.obtenerNuevasNotificacionesEvento.asObservable();

  private alertaCerradaEvento = new Subject<any>();
  public alertaCerradaEventoObservable$ = this.alertaCerradaEvento.asObservable();

  private moverScrollPrincipalEvento = new Subject<any>();
  public moverScrollPrincipalEventoObservable$ = this.moverScrollPrincipalEvento.asObservable();

  constructor() { }

  /*public enviarMetasDeVenta(metasDeVenta: MetaDeVenta[]) {
    this.obtenerMetasDeVentaEvento.next(metasDeVenta);
  }*/

  public reiniciarIndicePaginador() {
    this.reiniciarIndicePaginadorEvento.next(true);
  }

  public obtenerNuevoNumeroElementos(tipoAccion: boolean) {
    this.obtenerNuevoNumeroElementosEvento.next(tipoAccion);
  }

  public abrirCerrarBarraDeNavegacion(abrir?: boolean) {
    this.abrirCerrarBarraDeNavegacionEvento.next(abrir);
  }

  public obtenerNuevaCantidadExistencias() {
    this.obtenerNuevaCantidadExistenciasEvento.next();
  }

  public cambiarPantallaVenta() {
    this.cambiarPantallaVentaEvento.next();
  }

  public obtenerNotificacionesEnviadas() {
    this.obtenerNotificacionesEnviadasEvento.next();
  }

  public obtenerNuevasNotificaciones() {
    this.obtenerNuevasNotificacionesEvento.next();
  }

  /*public alertaCerrada(referencia: NotificacionAlertaReferencia) {
    this.alertaCerradaEvento.next(referencia);
  }*/

  public moverScrollPrincipal(x: number, y: number) {
    this.moverScrollPrincipalEvento.next({ x, y })
  }
}
