import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from '../../compartido/constantes/ajustes-aplicacion';
import {SlideCarrusel} from "../../compartido/modelos/slideCarrusel";
import {CorreoContacto} from "../../compartido/modelos/correoContacto.model";

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private httpClient: HttpClient) { }

  /* * * * * * * * * * * * * * * * * * * * * * * *     G  E  T    * * * * * * * * * * * * * * * * * * * * * * * * * * */
  public obtenerSlidesCarruselActivasInactivas(activo: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `inicio/slides-carrusel-activas-inactivas?activo=${activo}`, AjustesAplicacion.Opciones);
  }
  public obtenerBanners(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'inicio/obtener-banners', AjustesAplicacion.Opciones);
  }
  public obtenerBannersActivosInactivos(activo: boolean): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `inicio/banners-activos-inactivos?activo=${activo}`, AjustesAplicacion.Opciones);
  }
  public obtenerBannersActivos(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'inicio/obtener-banners-activos', AjustesAplicacion.Opciones);
  }
  /* * * * * * * * * * * * * * * * * * * * * * * *     P O S T    * * * * * * * * * * * * * * * * * * * * * * * * * * */
  public guardarEnviarCorreoContacto(correoContacto: CorreoContacto): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'inicio/correo-contacto', correoContacto, AjustesAplicacion.Opciones);
  }
  public guardarNuevaSlide(slideCarousel: SlideCarrusel): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'inicio/guardar-slide-carousel', slideCarousel, AjustesAplicacion.Opciones);
  }
  public guardarImagenSlide(_idSlideCarousel: string, slide: FormData): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'inicio/guardar-imagen-slide-carousel?id_slide=' + _idSlideCarousel, slide);
  }
  /*public guardarNuevoBanner(banner: Banner): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'inicio/guardar-banner', banner, AjustesAplicacion.Opciones);
  }*/
  public guardarImagenBanner(_idBanner: string, banner: FormData): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'inicio/guardar-imagen-banner?idBanner=' + _idBanner, banner);
  }
  public funcionParaPruebas(): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'inicio/pruebas', AjustesAplicacion.Opciones);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * *     P A T C H    * * * * * * * * * * * * * * * * * * * * * * * * * * */
  public habilitarSlideCarousel(idSlideCarousel: string): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'inicio/habilitar-slide-carousel?id=' + idSlideCarousel, AjustesAplicacion.Opciones);
  }
  public deshabilitarSlideCarousel(idSlideCarousel: string): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'inicio/deshabilitar-slide-carousel?id=' + idSlideCarousel, AjustesAplicacion.Opciones);
  }
  public habilitarBanner(idBanner: string): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'inicio/habilitar-banner?id=' + idBanner, AjustesAplicacion.Opciones);
  }
  public deshabilitarBanner(idBanner: string): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + 'inicio/deshabilitar-banner?id=' + idBanner, AjustesAplicacion.Opciones);
  }
  public aumentarIdOrdenSlideCarrusel(idOrdenPorCambiar: number): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `inicio/aumentar-id-orden-slide-carrusel?idOrdenPorCambiar=${idOrdenPorCambiar}`, AjustesAplicacion.Opciones);
  }
  public disminuirIdOrdenSlideCarrusel(idOrdenPorCambiar: number): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `inicio/disminuir-id-orden-slide-carrusel?idOrdenPorCambiar=${idOrdenPorCambiar}`, AjustesAplicacion.Opciones);
  }
  public aumentarIdOrdenBanner(idOrdenPorCambiar: number): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `inicio/aumentar-id-orden-banner?idOrdenPorCambiar=${idOrdenPorCambiar}`, AjustesAplicacion.Opciones);
  }
  public disminuirIdOrdenBanner(idOrdenPorCambiar: number): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `inicio/disminuir-id-orden-banner?idOrdenPorCambiar=${idOrdenPorCambiar}`, AjustesAplicacion.Opciones);
  }
  public randomizarBannersActivos(): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `inicio/randomizar-banners-activos`, AjustesAplicacion.Opciones);
  }
  public randomizarSlidesCarruselActivas(): Observable<any> {
    return this.httpClient.patch(AjustesAplicacion.APIEndpoint + `inicio/randomizar-slides-carrusel-activas`, AjustesAplicacion.Opciones);
  }
}
