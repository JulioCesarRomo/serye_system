import { Injectable } from '@angular/core';
// import {Acceso} from '../../compartido/modelos/acceso.model';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
// import {TiposPrecio} from '../../compartido/enumeraciones/tipos-precio.enum';
// import {EstadosVenta} from '../../compartido/enumeraciones/estados-venta.enum';
import {Observable} from 'rxjs';
import {AjustesAplicacion} from '../../compartido/constantes/ajustes-aplicacion';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as momento from 'moment';
import {CurrencyPipe} from '@angular/common';
import {Router} from "@angular/router";
import {AlertasService} from "./alertas.service";
import {TiposUsuario} from "../../compartido/enumeraciones/tipos-usuario.enum";
import {TiposDePersona} from "../../compartido/enumeraciones/tipos-de-persona.enum";
// import {Producto} from "../../compartido/modelos/producto.model";
// import {ImagenProducto} from "../../compartido/modelos/imagenProducto.model";
// import {AutenticacionService} from "./autenticacion.service";
// import {Direccion} from "../../compartido/modelos/direccion.model";
// import {CodigoPostal} from "../../compartido/modelos/codigoPostal.model";
// import {SlideCarousel} from "../../compartido/modelos/slideCarousel";
// import {Banner} from "../../compartido/modelos/banner.model";
// import {ArchivoFiscal} from "../../compartido/modelos/archivoFiscal.model";
// import {TiposDePersona} from "../../compartido/enumeraciones/tipos-de-persona.enum";
// import {FacturacionService} from "./facturacion.service";
// import {FormaDePago} from "../../compartido/modelos/formaDePago.model";
// import {MetodoDePago} from "../../compartido/modelos/metodoDePago.model";
// import {TipoDeComprobante} from "../../compartido/modelos/tipoDeComprobante.model";
// import {UsoDelCfdi} from "../../compartido/modelos/usoDelCfdi.model";
// import {Moneda} from "../../compartido/modelos/moneda.model";
// import {ClaveProductoServicio} from "../../compartido/modelos/claveProductoServicio.model";
// import {ClaveUnidad} from "../../compartido/modelos/claveUnidad.model";
// import {PaqueteriaEnvioProducto, ProductoCarrito} from "../../compartido/modelos/productoCarrito.model";
// import {ProductoCompra} from "../../compartido/modelos/compra.model";
// import {Router} from "@angular/router";
// import {ClavesFormasDePago} from "../../compartido/enumeraciones/claves-formas-de-pago.enum";

@Injectable({
  providedIn: 'root'
})
export class FuncionesGeneralesService {
  // ClavesFormasDePago = ClavesFormasDePago;
  constructor(
      // private router: Router,
      private httpClient: HttpClient,
      private _serAlerta: AlertasService,
      private currencyPipe: CurrencyPipe,
      // private _serAutenticacion: AutenticacionService,
    ) { }

  obtenerFechaActual(){ return new Date(Date.now())}
  obtenerTipoUsuario(tipoUsuario: number): string {
    switch (tipoUsuario) {
      case TiposUsuario.Root: return 'Root';
      case TiposUsuario.Administrador: return 'Administrador';
      case TiposUsuario.Empleado: return 'Empleado';
      default: return ''
    }
  }
  obtenerTipoDePersona(tipoDePersona: number): string {
    switch (tipoDePersona) {
      case TiposDePersona.Moral: return 'Moral';
      case TiposDePersona.Fisica: return 'Física';
      case TiposDePersona.Ninguna: return 'Ninguna';
      default: return ''
    }
  }
  /*obtenerNombreAcceso(acceso: Acceso | null){
    let nombre = '';
    if(isNotNullOrUndefined(acceso.nombre)) nombre += acceso.nombre;
    if(isNotNullOrUndefined(acceso.apepat)) nombre += ' ' + acceso.apepat;
    if(isNotNullOrUndefined(acceso.apemat)) nombre += ' ' + acceso.apemat;
    return nombre;
  }*/
  //FUNCIONES PARA VALIDAR SI EL USUARIO ESTÁ VERIFICADO
  /*validarAccesoVerificado(acceso: Acceso | null){
    if(isNotNullOrUndefined(acceso)) return acceso.verificado;
    else return false;
  }*/
  //FUNCIONES PARA OBTENER RAZON SOCIAL (SE UTILIZA EN LOS ARCHIVOS FISCALES)
  /*obtenerRazonSocial(elemento: Acceso | ArchivoFiscal | string | null){
    if(isNotNullOrUndefined(elemento)){
      const elementoCasteado: Acceso | ArchivoFiscal = <Acceso | ArchivoFiscal>elemento;
      switch (elementoCasteado.tipoDePersona) {
        case TiposDePersona.Moral: return elementoCasteado.razonSocial ? elementoCasteado.razonSocial : '-';
        case TiposDePersona.Fisica:
        case TiposDePersona.Ninguna:
          if (elementoCasteado.nombre || elementoCasteado.apepat || elementoCasteado.apemat) {
            return (elementoCasteado.nombre ? elementoCasteado.nombre : '') + (elementoCasteado.apepat ? (' ' + elementoCasteado.apepat) : '') + (elementoCasteado.apemat ? (' ' + elementoCasteado.apemat) : '');
          } else return '-';
        default: return '-';
      }
    } else return '-';
  }*/
  /*obtenerTipoPrecio(tipoPrecio: number){
    switch (tipoPrecio){
      case TiposPrecio.Base: return 'Base';
      case TiposPrecio.Oferta: return 'Oferta';
      case TiposPrecio.Mayoreo: return 'Mayoreo';
      default: return 'ERROR!';
    }
  }*/
  /* FUNCIÓN PARA CASTEAR A TIPO SERIAL (SEPARAR CADA 4 CARACTERES) */
  castearSerialCuatroCaracteres(cadena: string): string {
    return cadena.substring(0, 4)
        + ' - ' + cadena.substring(4, 8)
        + ' - ' + cadena.substring(8, 12)
        + ' - ' + cadena.substring(12, 16)
        + ' - ' + cadena.substring(16, 20)
        + ' - ' + cadena.substring(20, 24);
  }
  //FUNCION PARA CASTEAR UN ENTERO A CUATRO DIGITOS
  castearACuatroDigitos(numero: number): string {
    let numeroCasteado: string = '';
    for(let i=0; i < 4 - numero.toString().length; i++ ) numeroCasteado += '0';
    return (numeroCasteado += numero);
  }
  /*obtenerEstadoVenta(estado: number){
    switch (estado){
      case EstadosVenta.PendienteDePago: return 'Pendiente de pago';
      case EstadosVenta.EnProceso: return 'En proceso de validacion de pago';
      case EstadosVenta.Pagada: return 'Pagada';
      case EstadosVenta.Cancelada: return 'Cancelada';
      default: return 'ERROR!';
    }
  }*/
  // FUNCION PARA OBTENER LA CLAVE Y DESCRIPCION DE CLAVE DE UNIDAD DEL SAT
  /*obtenerClaveDescripcionProductoServicioSat(claveProductoServicio: ClaveProductoServicio | null): string {
    if (isNotNullOrUndefined(claveProductoServicio)) {
      let cadena: string = '';
      if (isNotNullOrUndefined(claveProductoServicio.clave)) cadena += claveProductoServicio.clave;
      if (isNotNullOrUndefined(claveProductoServicio.clave) && isNotNullOrUndefined(claveProductoServicio.clave)) cadena += ' - ';
      if (isNotNullOrUndefined(claveProductoServicio.descripcion)) cadena += claveProductoServicio.descripcion;
      return cadena;
    }
  }*/
  /*<><><><><> F U N C I O N E S   P A R A   I M A G E N E S <><><><><>*/
  obtenerRutaDeImagenDeSlide(nombreImagen: string | undefined){
    if(isNotNullOrUndefined(nombreImagen)){
      return (AjustesAplicacion.ImagenesSlidesEndpoint + nombreImagen);
    } else {
      return(AjustesAplicacion.ImagenDefaultSlide)
    }
  }
  obtenerRutaDeImagenDeCategoriaRaiz(nombreImagen: string | undefined){
    if(isNotNullOrUndefined(nombreImagen)){
      return (AjustesAplicacion.ImagenesCategoriasRaizSlidesEndpoint + nombreImagen);
    } else {
      return(AjustesAplicacion.ImagenDefaultSlide)
    }
  }
  obtenerRutaDeImagenDeMarca(nombreImagen: string | undefined){
    if(isNotNullOrUndefined(nombreImagen)){
      return (AjustesAplicacion.ImagenesMarcasEndpoint + nombreImagen);
    } else {
      return(AjustesAplicacion.ImagenDefaultSlide)
    }
  }
  /*obtenerRutaDeImagenPorDefectoDeProducto(producto: Producto){
    if(isNotNullOrUndefined((producto.imagenes[0]))){
        return (AjustesAplicacion.ImagenesAccesosEndpoint + this.obtener_IdAcceso(producto._idAcceso) + '/productos/' + producto._id + '/' + (<ImagenProducto>producto.imagenes[0]).nombre);
    } else {
      return(AjustesAplicacion.ImagenDefaultProducto)
    }
  }
  obtenerRutaDeImagenDeSlide(nombreImagen: string){
    if(isNotNullOrUndefined(nombreImagen)){
      return (AjustesAplicacion.ImagenesSlidesEndpoint + nombreImagen);
    } else {
      return(AjustesAplicacion.ImagenDefaultSlide)
    }
  }
  obtenerRutaDeImagenDeBanner(nombreImagen: string){
    if(isNotNullOrUndefined(nombreImagen)){
      return (AjustesAplicacion.ImagenesBannersEndpoint + nombreImagen);
    } else {
      return(AjustesAplicacion.ImagenDefaultSlide)
    }
  }
  obtenerRutaDeImagenDeComprobanteDePago(nombreImagen: string){
    if(isNotNullOrUndefined(nombreImagen)){
      return (AjustesAplicacion.ArchivosComprobantesDePagoEndpoint + nombreImagen);
    } else {
      return(AjustesAplicacion.ImagenDefaultSlide)
    }
  }
  obtenerRutaDeArchivoDeVerificacion(nombreArchivo: string){
    if(isNotNullOrUndefined(nombreArchivo))
      return (AjustesAplicacion.ArchivosVerificacionAccesoEndpoint + nombreArchivo);
    else return(AjustesAplicacion.ImagenDefaultSlide);
  }
  obtenerRutaImagenProducto(imagen: ImagenProducto, producto: Producto){
    if(isNotNullOrUndefined(imagen)){
      return (AjustesAplicacion.ImagenesAccesosEndpoint + this.obtener_IdAcceso(producto._idAcceso) + '/productos/' + producto._id + '/' + imagen.nombre);
    } else {
      return(AjustesAplicacion.ImagenDefaultProducto)
    }
  }
  obtenerRutaImagenPerfilAcceso(acceso: Acceso | null){
    if(isNotNullOrUndefined(acceso) && isNotNullOrUndefined(acceso.nombreFoto)){
      return (AjustesAplicacion.ImagenesAccesosEndpoint + this.obtener_IdAcceso(acceso) + '/perfil/' + acceso.nombreFoto);
    } else {
      return(AjustesAplicacion.ImagenDefaultPerfil)
    }
  }
  obtenerRutaImagenPerfilAccesoActivo(nombreFoto: string){
    if(isNotNullOrUndefined(nombreFoto)){
      return (AjustesAplicacion.ImagenesAccesosEndpoint + this._serAutenticacion.obtener_IdAcceso() + '/perfil/' + nombreFoto);
    } else {
      return(AjustesAplicacion.ImagenDefaultPerfil)
    }
  }
  obtenerRutaImagenLogotipoAccesoActivo(nombreLogotipo: string){
    if(isNotNullOrUndefined(nombreLogotipo)){
      return (AjustesAplicacion.ImagenesAccesosEndpoint + this._serAutenticacion.obtener_IdAcceso() + '/logotipo/' + nombreLogotipo);
    } else {
      return(AjustesAplicacion.ImagenDefaultLogotipo)
    }
  }
  obtenerRutaDeRedireccionSlideBanner(slideBannerInicio: SlideCarousel | Banner){
    if(isNotNullOrUndefined(slideBannerInicio._idCategoria))
      return(`/inicio/compras/productos/${slideBannerInicio._idCategoria}`)
    else if(isNotNullOrUndefined(slideBannerInicio._idProducto))
      return(`/inicio/compras/producto/${slideBannerInicio._idProducto}`)
    else if(isNotNullOrUndefined(slideBannerInicio.linkRedideccion))
      return(`${slideBannerInicio.linkRedideccion}`)
    else return ('/inicio/compras/productos/all');
  }
  redireccionarSlideBanner(slideBannerInicio: SlideCarousel | Banner){
    if(isNotNullOrUndefined(slideBannerInicio._idCategoria))
      this.router.navigate([`/inicio/compras/productos/${slideBannerInicio._idCategoria}`]);
    else if(isNotNullOrUndefined(slideBannerInicio._idProducto))
      this.router.navigate([`/inicio/compras/productos/${slideBannerInicio._idProducto}`]);
    else if(isNotNullOrUndefined(slideBannerInicio.linkRedideccion))
      window.location.replace(`${slideBannerInicio.linkRedideccion}`)
    else return ('/inicio/compras/productos/all');
  }
    obtenerDireccion(direccion: Direccion | null){
    if(isNotNullOrUndefined(direccion)){
      let cadenaDireccion: string = '';
      if (isNotNullOrUndefined(direccion.calle)) cadenaDireccion += direccion.calle;
      if (isNotNullOrUndefined(direccion.numeroExterior)) cadenaDireccion += ' ' + direccion.numeroExterior;
      if (isNotNullOrUndefined(direccion.numeroInterior)) cadenaDireccion += ', ' + direccion.numeroInterior;
      if (isNotNullOrUndefined((<CodigoPostal>direccion._idCodigoPostal).d_asenta)) cadenaDireccion += ', ' + (<CodigoPostal>direccion._idCodigoPostal).d_asenta;
      if (isNotNullOrUndefined((<CodigoPostal>direccion._idCodigoPostal).d_codigo)) cadenaDireccion += ' C.P.:' + (<CodigoPostal>direccion._idCodigoPostal).d_codigo;
      if (isNotNullOrUndefined((<CodigoPostal>direccion._idCodigoPostal).d_ciudad)) cadenaDireccion += ', ' + (<CodigoPostal>direccion._idCodigoPostal).d_ciudad;
      if (isNotNullOrUndefined((<CodigoPostal>direccion._idCodigoPostal).d_estado)) cadenaDireccion += ', ' + (<CodigoPostal>direccion._idCodigoPostal).d_estado;
      return cadenaDireccion;
    } else return('ERROR')
  }*/
  capitalizarCadena(cadena: string){
    return cadena ? (cadena.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())): '';
  }
  castearTelefonoDiezDigitos(telefono: string){
    return telefono ? (telefono.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())): '';
  }
  transformarTipoPrecio(precio: number | string) {
   // @ts-ignore
    return precio ? (this.currencyPipe.transform(String(precio).replace(/[^0-9.]+/g, '').match(/^-?\d+(?:\.\d{0,4})?/)[0], '$', 'symbol', '1.2-4')):'';
  }
  transformarFechaConHora(fecha: Date) {
    return fecha ? momento(fecha).locale('es').format('DD/MM/YY, h:mm:ss a'): '-';
  }
  /*obtener_IdAcceso(acceso: Acceso | string){
    if(isNotNullOrUndefined((<Acceso>acceso)._id)) return (<Acceso>acceso)._id;
    else return acceso;
  }*/
  /*obtenerDescripcionFormaDePago(formaDePago: FormaDePago | string | null){
    if(isNotNullOrUndefined(formaDePago) && isNotNullOrUndefined((<FormaDePago>formaDePago).descripcion))
      return (<FormaDePago>formaDePago).descripcion;
    else return 'ERROR!'
  }
  validarFormaDePagoParaObservaciones(formaDePago: FormaDePago | string | null){
    return isNotNullOrUndefined(formaDePago) && isNotNullOrUndefined((<FormaDePago>formaDePago).clave) &&
        (Number((<FormaDePago>formaDePago).clave) == ClavesFormasDePago.ChequeNominativo ||
            Number((<FormaDePago>formaDePago).clave) == ClavesFormasDePago.Efectivo ||
            Number((<FormaDePago>formaDePago).clave) == ClavesFormasDePago.TarjetaDeCredito ||
            Number((<FormaDePago>formaDePago).clave) == ClavesFormasDePago.TarjetaDeDebito ||
            Number((<FormaDePago>formaDePago).clave) == ClavesFormasDePago.PorDefinir);
  }
  validarFormaDePagoTransferenciaElectronicaDeFondos(formaDePago: FormaDePago | string | null){
    return isNotNullOrUndefined(formaDePago) && isNotNullOrUndefined((<FormaDePago>formaDePago).clave) &&
        (Number((<FormaDePago>formaDePago).clave) == ClavesFormasDePago.TransferenciaElectronicaDeFondos);
  }
  validarFormaDePagoIntermediarioPagos(formaDePago: FormaDePago | string | null){
    return isNotNullOrUndefined(formaDePago) && isNotNullOrUndefined((<FormaDePago>formaDePago).clave) &&
        (Number((<FormaDePago>formaDePago).clave) == ClavesFormasDePago.IntermediarioPagos);
  }*/
  /*** <><><><><><><><><><><><><><><><><> F U N C I O N E S   P A R A   <><><><><><><><><><><><><><><><><><><><><> ***/
  /*** <><><><><><><><><><> O B T E N E R   C A N T I D A D E S   M O N E T A R I A S <><><><><><><><><><><><><><> ***/
  /*** <><><><><><><><><><><><><><><><><> D E   P R O D U C T O S <><><><><><><><><><><><><><><><><><><><><><><><> ***/
  /*obtenerDescuentoProductoCompra(productoCompra: ProductoCompra): number {
    // MAYOREO
    //CORRECCION MAYOREO LISTO
    if((<Producto>productoCompra._idProducto).opcionesMayoreo.length !== 0 && productoCompra.cantidad > 1) { //CONTIENE AL MENOS UNA OPCION DE MAYOREO
      (<Producto>productoCompra._idProducto).opcionesMayoreo.sort((a, b) => {
        if (a.cantidad > b.cantidad)
          return -1;
        if (a.cantidad < b.cantidad)
          return 1;
        return 0;
      });
      for (let opcionMayoreo of (<Producto>productoCompra._idProducto).opcionesMayoreo) {
        if (productoCompra.cantidad >= opcionMayoreo.cantidad) {
          return Number(Number((<Producto>productoCompra._idProducto).precioBase) - Number(opcionMayoreo.precio));
        }
      }
    }
    // OFERTA - DESCUENTO DE OFERTA
    else if(productoCompra._idProducto.precioOferta !== undefined)
      return ((Number(productoCompra._idProducto.precioBase) * Number(productoCompra.cantidad)) - (Number(productoCompra._idProducto.precioOferta) * Number(productoCompra.cantidad)));
    // PRECIO BASE - SIN DESCUENTO
    else
      return (0);
  }*/
  //FUNCIONES PARA OBTENER EL PRECIO DE LA PAQUETERÍA DE ENVIO DE UN PRODUCTO COMPRADO/EN CARRITO
  /*obtenerPrecioPaqueteriaEnvio(paqueteriaEnvioProducto: PaqueteriaEnvioProducto | null){
    if(isNotNullOrUndefined(paqueteriaEnvioProducto)){
      if(paqueteriaEnvioProducto.envioGratis) return 0;
      else return(paqueteriaEnvioProducto.precio);
    } else return 0;
  }*/

  /*** <><><><><><><><><><><><><><><><><> F U N C I O N E S   P A R A   <><><><><><><><><><><><><><><><><><><><><> ***/
  /*** <><><><><><><><><><> O B T E N E R   C O L E C C I O N E S   U S A D A S   E N <><><><><><><><><><><><><><> ***/
  /*** <><><><><><><><><><><><> V A R I A S   P A R T E S   D E L   S I S T E M A <><><><><><><><><><><><><><><><> ***/
  // FUNCIONES PARA OBTENER COLECCIONES USADAS EN VARIAS PARTES DLE SISTEMA
  //OBTENER TODAS LAS FORMAS DE PAGO
  /*obtenerFormasDePago(){
    return new Promise<FormaDePago[]>((resolve, reject) => {
      this._serFacturacion.obtenerFormasDePagoFiltradas().subscribe(
          (formasDePago: FormaDePago[]) => {
            resolve(formasDePago);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
           reject();
          }
      )
    })
  }*/
  //OBTENER TODOS LOS METODOS DE PAGO
  /*obtenerMetodosDePago(){
    return new Promise<MetodoDePago[]>((resolve, reject) => {
      this._serFacturacion.obtenerMetodosDePago().subscribe(
          (metodosDePago: MetodoDePago[]) => {
            resolve(metodosDePago);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
           reject();
          }
      )
    })
  }*/
  //OBTENER EL METODO DE PAGO POR DEFECTO (PUE)
  /*obtenerMetodoDePagoPorDefecto(){
    return new Promise<MetodoDePago>((resolve, reject) => {
      this._serFacturacion.obtenerMetodoDePagoPorDefecto().subscribe(
          (metodoDePago: MetodoDePago) => {
            resolve(metodoDePago);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //OBTENER TODOS LOS USOS DEL CFDI
  /*obtenerUsosDelCfdi(){
    return new Promise<UsoDelCfdi[]>((resolve, reject) => {
      this._serFacturacion.obtenerUsosDelCfdi().subscribe(
          (usosDelCfdi: UsoDelCfdi[]) => {
            resolve(usosDelCfdi);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
           reject();
          }
      )
    })
  }*/
  //OBTENER EL USO DEL CFDI POR DEFECTO (P01)
  /*obtenerUsoDelCfdiPorDefecto(){
    return new Promise<UsoDelCfdi>((resolve, reject) => {
      this._serFacturacion.obtenerUsoDelCfdiPorDefecto().subscribe(
          (usoDelCfdi: UsoDelCfdi) => {
            resolve(usoDelCfdi);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //OBTENER TODOS LOS TIPOS DE COMPROBANTE
  /*obtenerTiposDeComprobante(){
    return new Promise<TipoDeComprobante[]>((resolve, reject) => {
      this._serFacturacion.obtenerTiposDeComprobante().subscribe(
          (tiposDeComprobante: TipoDeComprobante[]) => {
            resolve(tiposDeComprobante);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
           reject();
          }
      )
    })
  }*/
  //OBTENER EL TIPO DE COMPROBANTE POR DEFECTO (I)
  /*obtenerTipoDeComprobantePorDefecto(){
    return new Promise<TipoDeComprobante>((resolve, reject) => {
      this._serFacturacion.obtenerTipoDeComprobantePorDefecto().subscribe(
          (tipoDeComprobante: TipoDeComprobante) => {
            resolve(tipoDeComprobante);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //OBTENER TODAS LAS MONEDAS
  /*obtenerMonedas(){
    return new Promise<Moneda[]>((resolve, reject) => {
      this._serFacturacion.obtenerMonedas().subscribe(
          (monedas: Moneda[]) => {
            resolve(monedas);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
           reject();
          }
      )
    })
  }*/
  //OBTENER LA MONEDA POR DEFECTO (MXN)
  /*obtenerMonedaPorDefecto(){
    return new Promise<Moneda>((resolve, reject) => {
      this._serFacturacion.obtenerMonedaPorDefecto().subscribe(
          (moneda: Moneda) => {
            resolve(moneda);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //OBTENER TODAS LAS CLAVES DE UNIDAD
  /*obtenerClavesUnidad(){
    return new Promise<ClaveUnidad[]>((resolve, reject) => {
      this._serFacturacion.obtenerClavesUnidad().subscribe(
          (clavesUnidad: ClaveUnidad[]) => {
            resolve(clavesUnidad);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //OBTENER LA CLAVE DE UNIDAD POR DEFECTO
  /*obtenerClaveUnidadPorDefecto(){
    return new Promise<ClaveUnidad>((resolve, reject) => {
      this._serFacturacion.obtenerClaveUnidadPorDefecto().subscribe(
          (claveUnidad: ClaveUnidad) => {
            resolve(claveUnidad);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //OBTENER TODAS LAS CLAVES PRODUCTO SERVICIO
  /*obtenerClavesProductoServicio(){
    return new Promise<ClaveProductoServicio[]>((resolve, reject) => {
      this._serFacturacion.obtenerClavesProductoServicio().subscribe(
          (claveProductoServicio: ClaveProductoServicio[]) => {
            resolve(claveProductoServicio);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //OBTENER LA CLAVE PRODUCTO SERVIDIO POR DEFECTO
  /*obtenerClaveProductoServicioPorDefecto(){
    return new Promise<ClaveProductoServicio>((resolve, reject) => {
      this._serFacturacion.obtenerClaveProductoServicioPorDefecto().subscribe(
          (claveProductoServicio: ClaveProductoServicio) => {
            resolve(claveProductoServicio);
          }, (err: HttpErrorResponse) => {
            this._serAlerta.error(err.error.titulo, err.error.detalles, 3000);
            reject();
          }
      )
    })
  }*/
  //CONVERTIR NUMERO A LETRAS
  numeroALetras = (() => {
    function Unidades(num: any) {
      switch (num) {
        case 1: return 'UN';
        case 2: return 'DOS';
        case 3: return 'TRES';
        case 4: return 'CUATRO';
        case 5: return 'CINCO';
        case 6: return 'SEIS';
        case 7: return 'SIETE';
        case 8: return 'OCHO';
        case 9: return 'NUEVE';
      }
      return '';
    }
    function Decenas(num: any) {
      const decena = Math.floor(num / 10);
      const unidad = num - (decena * 10);
      switch (decena) {
        case 1:
          switch (unidad) {
            case 0: return 'DIEZ';
            case 1: return 'ONCE';
            case 2: return 'DOCE';
            case 3: return 'TRECE';
            case 4: return 'CATORCE';
            case 5: return 'QUINCE';
            default: return 'DIECI' + Unidades(unidad);
          }
        case 2:
          switch (unidad) {
            case 0: return 'VEINTE';
            default: return 'VEINTI' + Unidades(unidad);
          }
        case 3: return DecenasY('TREINTA', unidad);
        case 4: return DecenasY('CUARENTA', unidad);
        case 5: return DecenasY('CINCUENTA', unidad);
        case 6: return DecenasY('SESENTA', unidad);
        case 7: return DecenasY('SETENTA', unidad);
        case 8: return DecenasY('OCHENTA', unidad);
        case 9: return DecenasY('NOVENTA', unidad);
        case 0: return Unidades(unidad);
      }
    }
    function DecenasY(strSin: any, numUnidades: any) {
      if (numUnidades > 0) return strSin + ' Y ' + Unidades(numUnidades);
      return strSin;
    }
    function Centenas(num: any) {
      const centenas = Math.floor(num / 100);
      const decenas = num - (centenas * 100);
      switch (centenas) {
        case 1:
          if (decenas > 0) return 'CIENTO ' + Decenas(decenas);
          return 'CIEN';
        case 2:return 'DOSCIENTOS ' + Decenas(decenas);
        case 3:return 'TRESCIENTOS ' + Decenas(decenas);
        case 4:return 'CUATROCIENTOS ' + Decenas(decenas);
        case 5:return 'QUINIENTOS ' + Decenas(decenas);
        case 6:return 'SEISCIENTOS ' + Decenas(decenas);
        case 7:return 'SETECIENTOS ' + Decenas(decenas);
        case 8:return 'OCHOCIENTOS ' + Decenas(decenas);
        case 9:return 'NOVECIENTOS ' + Decenas(decenas);
      }
      return Decenas(decenas);
    }
    function Seccion(num: any, divisor: any, strSingular: any, strPlural: any) {
      const cientos = Math.floor(num / divisor);
      const resto = num - (cientos * divisor);
      let letras = '';
      if (cientos > 0) {
        if (cientos > 1) letras = Centenas(cientos) + ' ' + strPlural;
        else letras = strSingular;
      }
      if (resto > 0) {
        letras += '';
      }
      return letras;
    }
    function Miles(num: any) {
      const divisor = 1000;
      const cientos = Math.floor(num / divisor);
      const resto = num - (cientos * divisor);

      const strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
      const strCentenas = Centenas(resto);

      if (strMiles === '') {
        return strCentenas;
      }

      return strMiles + ' ' + strCentenas;
    } // Miles()

    function Millones(num: any) {
      const divisor = 1000000;
      const cientos = Math.floor(num / divisor);
      const resto = num - (cientos * divisor);

      const strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
      const strMiles = Miles(resto);

      if (strMillones === '') {
        return strMiles;
      }

      return strMillones + ' ' + strMiles;
    } // Millones()

    return function NumeroALetras(num: any, currency: any) {
      currency = currency || {};
      const data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: '',
        letrasMonedaPlural: currency.plural || 'PESOS CHILENOS', // 'PESOS', 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: currency.singular || 'PESO CHILENO', // 'PESO', 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
        letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
      };

      if (data.centavos > 0)
        data.letrasCentavos = 'CON ' + (() => {
          if (data.centavos === 1) return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
          else return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
        })();
      if (data.enteros === 0) return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      if (data.enteros === 1) return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
      else return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    };

  })();
}
