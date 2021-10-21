import {Router} from 'express';
import * as InicioCtrl from '../controladores/inicio';
/*import {subirImagenBanner, subirImagenSlide} from "../servicios/almacenamiento";
import {disminuirIdOrdenSlideCarrusel, funcionParaPruebas} from "../controladores/inicio";*/

const inicioRutas = Router();


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   G  E  T   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* S L I D E S   C A R O U S E L */
//inicioRutas.get('/slides-carousel', InicioCtrl.obtenerSlidesCarousel);
inicioRutas.get('/slides-carrusel-activas-inactivas', InicioCtrl.obtenerSlidesCarruselActivasInactivasCarrusel);
//inicioRutas.get('/obtener-slides-carousel-activas', InicioCtrl.obtenerSlidesCarouselActivas);
/* B A N N E R S   I N I C I O */
//inicioRutas.get('/obtener-banners', InicioCtrl.obtenerBanners);
//inicioRutas.get('/banners-activos-inactivos', InicioCtrl.obtenerBannersActivosInactivos);
//inicioRutas.get('/obtener-banners-activos', InicioCtrl.obtenerBannersActivos);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * P  O  S  T * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */
inicioRutas.post('/correo-contacto', InicioCtrl.guardarEnviarCorreoContacto);
/* S L I D E S   C A R O U S E L */
//inicioRutas.post('/guardar-slide-carousel', InicioCtrl.guardarNuevaSlideCarousel);
//inicioRutas.post('/guardar-imagen-slide-carousel', subirImagenSlide.single('slide'), InicioCtrl.guardarImagenSlideCarousel);
/* B A N N E R S   I N I C I O */
//inicioRutas.post('/guardar-banner', InicioCtrl.guardarNuevoBanner);
//inicioRutas.post('/guardar-imagen-banner', subirImagenBanner.single('banner'), InicioCtrl.guardarImagenBanner);
//inicioRutas.post('/pruebas', InicioCtrl.funcionParaPruebas);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   P  U  T   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  P  A  T  C  H  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* S L I D E S   C A R O U S E L */
//inicioRutas.patch('/habilitar-slide-carousel', InicioCtrl.habilitarSlideCarousel);
//inicioRutas.patch('/deshabilitar-slide-carousel', InicioCtrl.deshabilitarSlideCarousel);
//inicioRutas.patch('/aumentar-id-orden-slide-carrusel', InicioCtrl.aumentarIdOrdenSlideCarrusel);
//inicioRutas.patch('/disminuir-id-orden-slide-carrusel', InicioCtrl.disminuirIdOrdenSlideCarrusel);
//inicioRutas.patch('/randomizar-slides-carrusel-activas', InicioCtrl.randomizarSlidesCarruselActivas);
/* B A N N E R S   I N I C I O */
//inicioRutas.patch('/habilitar-banner', InicioCtrl.habilitarBanner);
//inicioRutas.patch('/deshabilitar-banner', InicioCtrl.deshabilitarBanner);
//inicioRutas.patch('/aumentar-id-orden-banner', InicioCtrl.aumentarIdOrdenBanner);
//inicioRutas.patch('/disminuir-id-orden-banner', InicioCtrl.disminuirIdOrdenBanner);
//inicioRutas.patch('/randomizar-banners-activos', InicioCtrl.randomizarBannersActivos);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  D  E  L  E  T  E  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */


export default inicioRutas;
