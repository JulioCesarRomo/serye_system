//DECLARACIÓN DE LAS VARIABLES GLOBALES UTILIZADAS EN LA APLICACIÓN
import path from "path";
import fs from 'fs';
// DESARROLLO
export const SECRETA = 'llaveSecretaTokenAutenticacionSerye';
export const RUTA_DOCUMENTOS = path.join(__dirname, '../../../../../documentos/');
export const RUTA_ARCHIVOS = path.join(__dirname, '../../../../../documentos/archivos/');
export const RUTA_ARCHIVOS_VERIFICACIONES_ACCESO = path.join(__dirname, '../../../../../documentos/archivos/verificaciones-acceso/');
export const RUTA_ARCHIVOS_COMPROBANTES_DE_PAGO = path.join(__dirname, '../../../../../documentos/archivos/comprobantes-pago/');
export const RUTA_ARCHIVOS_FISCALES = path.join(__dirname, '../../../../../documentos/archivos/fiscales/csd/');
export const RUTA_TIMBRES_CFDI = path.join(__dirname, '../../../../../documentos/archivos/fiscales/cfdi/timbres/');
export const RUTA_CANCELACIONES_CFDI = path.join(__dirname, '../../../../../documentos/archivos/fiscales/cfdi/cancelaciones/');
export const RUTA_ERRORES_CFDI = path.join(__dirname, '../../../../../documentos/archivos/fiscales/cfdi/errores/');
export const RUTA_DEFAULT = path.join(__dirname, '../../../../../documentos/default/');
export const RUTA_IMAGENES_ACCESOS = path.join(__dirname, '../../../../../documentos/imagenes_accesos/');
export const RUTA_IMAGENES_SLIDES = path.join(__dirname, '../../../../../documentos/imagenes_slides/');
export const RUTA_IMAGENES_BANNERS = path.join(__dirname, '../../../../../documentos/imagenes_banners/');
export const RUTA_IMAGEN_DEFECTO_PERFIL = path.join(__dirname, '../../../../../documentos/default/perfil.png');
export const RUTA_IMAGEN_DEFECTO_PRODUCTO = path.join(__dirname, '../../../../../documentos/default/producto.png');
export const RUTA_IMAGEN_DEFECTO_SLIDE = path.join(__dirname, '../../../../../documentos/default/producto.png');
export const RUTA_TEMPORALES = path.join(__dirname, '../../../../../temp/');
export const PUERTO_SERVIDOR = Number(process.env.PORT) || 3001;
export const URL_ARCHIVOS = '../../../documentos';
export const RUTA_ASSETS_FRONT = path.join(__dirname, '../../../../cloudmart_app/src/assets/');
export const RUTA_CADENA_ORIGINAL = path.join('Z:\\Users\\Zero\\Documents\\CadenaOriginal\\cadenaoriginal_3_3.xslt');
export const OPCIONES = {};
//PRODUCCION
/*export const SECRETA = 'llaveSecretaTokenAutenticacionCloudMart';
export const SECRETA_ENCRIPTADO = 'llaveSecretaEncriptadoCloudMart';
export const RUTA_DOCUMENTOS = '/var/CLOUDMART/www/documentos/';
export const RUTA_ARCHIVOS = '/var/CLOUDMART/www/documentos/archivos/';
export const RUTA_ARCHIVOS_VERIFICACIONES_ACCESO = '/var/CLOUDMART/www/documentos/archivos/verificaciones-acceso/';
export const RUTA_ARCHIVOS_COMPROBANTES_DE_PAGO = '/var/CLOUDMART/www/documentos/archivos/comprobantes-pago/';
export const RUTA_ARCHIVOS_FISCALES = '/var/CLOUDMART/www/documentos/archivos/fiscales/csd/';
export const RUTA_TIMBRES_CFDI = '/var/CLOUDMART/www/documentos/archivos/fiscales/timbres/';
export const RUTA_CANCELACIONES_CFDI = '/var/CLOUDMART/www/documentos/archivos/fiscales/cancelaciones/';
export const RUTA_ERRORES_CFDI = '/var/CLOUDMART/www/documentos/archivos/fiscales/errores/';
export const RUTA_DEFAULT = '/var/CLOUDMART/www/documentos/default/';
export const RUTA_IMAGENES_ACCESOS = '/var/CLOUDMART/www/documentos/imagenes_accesos';
export const RUTA_IMAGENES_SLIDES = '/var/CLOUDMART/www/documentos/imagenes_slides/';
export const RUTA_IMAGENES_BANNERS = '/var/CLOUDMART/www/documentos/imagenes_banners/';
export const RUTA_IMAGEN_DEFECTO_PERFIL = '/var/CLOUDMART/www/documentos/default/perfil.png';
export const RUTA_IMAGEN_DEFECTO_PRODUCTO = '/var/CLOUDMART/www/documentos/default/producto.png';
export const RUTA_IMAGEN_DEFECTO_SLIDE = '/var/CLOUDMART/www/documentos/default/producto.png';
export const RUTA_TEMPORALES = '/var/CLOUDMART/www/temp/';
export const RUTA_CADENA_ORIGINAL = '/var/CLOUDMART/www/documentos/cadena_original/cadenaoriginal_3_3.xslt';
export const PUERTO_SERVIDOR = Number(process.env.PORT) || 5529;
export const URL_ARCHIVOS = '/var/CLOUDMART/www/documentos';
export const OPCIONES = {
    key: fs.readFileSync('/etc/apache2/certificados/CLOUDMART/_.cloudmart.mx_private_key.key'),
    cert: fs.readFileSync('/etc/apache2/certificados/CLOUDMART/cloudmart.mx_ssl_certificate.cer'),
}*/
//PRODUCCIÓN BAZARWEB
/*
export const SECRETA = 'llaveSecretaTokenAutenticacionSerye';
export const SECRETA_ENCRIPTADO = 'llaveSecretaEncriptadoSerye';
export const RUTA_DOCUMENTOS = '/var/www/vhosts/serye.net/documentos/';
export const RUTA_ARCHIVOS = '/var/www/vhosts/serye.net/documentos/archivos/';
export const RUTA_ARCHIVOS_VERIFICACIONES_ACCESO = '/var/www/vhosts/serye.net/documentos/archivos/verificaciones-acceso/';
export const RUTA_ARCHIVOS_COMPROBANTES_DE_PAGO = '/var/www/vhosts/serye.net/documentos/archivos/comprobantes-pago/';
export const RUTA_ARCHIVOS_FISCALES = '/var/www/vhosts/serye.net/documentos/archivos/fiscales/csd/';
export const RUTA_TIMBRES_CFDI = '/var/www/vhosts/serye.net/documentos/archivos/fiscales/timbres/';
export const RUTA_CANCELACIONES_CFDI = '/var/www/vhosts/serye.net/documentos/archivos/fiscales/cancelaciones/';
export const RUTA_ERRORES_CFDI = '/var/www/vhosts/serye.net/documentos/archivos/fiscales/errores/';
export const RUTA_DEFAULT = '/var/www/vhosts/serye.net/documentos/default/';
export const RUTA_IMAGENES_ACCESOS = '/var/www/vhosts/serye.net/documentos/imagenes_accesos';
export const RUTA_IMAGENES_SLIDES = '/var/www/vhosts/serye.net/documentos/slides/';
export const RUTA_IMAGENES_MARCAS = '/var/www/vhosts/serye.net/documentos/marcas/';
export const RUTA_IMAGENES_CATEGORIAS_RAIZ = '/var/www/vhosts/serye.net/documentos/categorias_raiz/';
export const RUTA_IMAGENES_BANNERS = '/var/www/vhosts/serye.net/documentos/imagenes_banners/';
export const RUTA_IMAGEN_DEFECTO_PERFIL = '/var/www/vhosts/serye.net/documentos/default/perfil.png';
export const RUTA_IMAGEN_DEFECTO_PRODUCTO = '/var/www/vhosts/serye.net/documentos/default/producto.png';
export const RUTA_IMAGEN_DEFECTO_SLIDE = '/var/www/vhosts/serye.net/documentos/default/producto.png';
export const RUTA_TEMPORALES = '/var/www/vhosts/serye.net/temp/';
export const RUTA_CADENA_ORIGINAL = '/var/www/vhosts/serye.net/documentos/cadena_original/cadenaoriginal_3_3.xslt';
export const PUERTO_SERVIDOR = Number(process.env.PORT) || 5529;
export const URL_ARCHIVOS = '/var/www/vhosts/serye.net/documentos';
export const OPCIONES = {
    key: fs.readFileSync('/etc/apache2/certificados/SERYE/_.serye.net_private_key.key'),
    cert: fs.readFileSync('/etc/apache2/certificados/SERYE/serye.net_ssl_certificate.cer'),
}
*/
