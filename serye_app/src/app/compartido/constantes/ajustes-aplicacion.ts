import { HttpHeaders } from '@angular/common/http';

const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
const prefijoRuta: string = 'http://localhost:3001';
//const prefijoRuta: string = 'https://serye.net:5529';
export const AjustesAplicacion = {
  APIEndpoint: `${prefijoRuta}/api/v1/`,
  SocketsUrl: `${prefijoRuta}`,
  DocumentosEndpoint: `${prefijoRuta}/`,
  ArchivosEndpoint: `${prefijoRuta}/archivos/`,
  ArchivosComprobantesDePagoEndpoint: `${prefijoRuta}/archivos/comprobantes-pago/`,
  ArchivosVerificacionAccesoEndpoint: `${prefijoRuta}/archivos/verificaciones-acceso/`,
  DefaultEndpoint: `${prefijoRuta}/default/`,
  ImagenesAccesosEndpoint: `${prefijoRuta}/imagenes_accesos/`,
  ImagenesSlidesEndpoint: `${prefijoRuta}/imagenes_slides/`,
  ImagenesCategoriasRaizSlidesEndpoint: `${prefijoRuta}/imagenes_categorias_raiz/`,
  ImagenesMarcasEndpoint: `${prefijoRuta}/imagenes_marcas/`,
  ImagenesBannersEndpoint: `${prefijoRuta}/imagenes_banners/`,
  ImagenDefaultPerfil: `${prefijoRuta}/default/perfil.png`,
  ImagenDefaultLogotipo: `${prefijoRuta}/default/logotipo.png`,
  ImagenDefaultProducto: `${prefijoRuta}/default/producto.png`,
  ImagenDefaultSlide: `${prefijoRuta}/default/producto.png`,
  Opciones: {
    headers: httpHeaders
  },
};
