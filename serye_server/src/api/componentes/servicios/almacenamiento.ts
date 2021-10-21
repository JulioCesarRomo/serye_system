import path from "path";
import multer from 'multer';
import {
    RUTA_ARCHIVOS, RUTA_ARCHIVOS_FISCALES, RUTA_ARCHIVOS_VERIFICACIONES_ACCESO,
    RUTA_IMAGENES_ACCESOS,
    RUTA_IMAGENES_BANNERS,
    RUTA_IMAGENES_SLIDES
} from "../../../config/globales";
import fs from "fs";

const almacenamientoImagenProducto = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const _idAcceso: string = <string>req.query.id_acceso;
        const _idProducto: string = <string>req.query.id_producto;
        const rutaImagen: string = path.join(RUTA_IMAGENES_ACCESOS, `${_idAcceso}/productos/${_idProducto}/`);
        verificarRuta(rutaImagen);
        cb(null, rutaImagen);
    }
})
const almacenamientoImagenSlide = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const rutaImagen: string = path.join(RUTA_IMAGENES_SLIDES);
        verificarRuta(rutaImagen);
        cb(null, rutaImagen);
    }
})
const almacenamientoImagenBanner = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const rutaImagen: string = path.join(RUTA_IMAGENES_BANNERS);
        verificarRuta(rutaImagen);
        cb(null, rutaImagen);
    }
})
const almacenamientoImagenComprobanteDePago = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const ruta: string = path.join(RUTA_ARCHIVOS, `comprobantes-pago/`);
        verificarRuta(ruta);
        cb(null, ruta);
    }
})
const almacenamientoPdfComprobanteDePago = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const ruta: string = path.join(RUTA_ARCHIVOS, `comprobantes-pago/`);
        verificarRuta(ruta);
        cb(null, ruta);
    }
})
const almacenamientoImagenVerificacionDeAcceso = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const ruta: string = path.join(RUTA_ARCHIVOS_VERIFICACIONES_ACCESO);
        verificarRuta(ruta);
        cb(null, ruta);
    }
})
const almacenamientoPdfVerificacionDeAcceso = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const ruta: string = path.join(RUTA_ARCHIVOS_VERIFICACIONES_ACCESO);
        verificarRuta(ruta);
        cb(null, ruta);
    }
})
const almacenamientoFotoPerfilAcceso = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const _idAcceso: string = <string>req.query._idAcceso;
        const rutaFotoPerfil: string = path.join(RUTA_IMAGENES_ACCESOS, `${_idAcceso}/perfil/`);
        verificarRuta(rutaFotoPerfil);
        cb(null, rutaFotoPerfil);
    }
})
const almacenamientoLogotipoPerfilAcceso = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        const _idAcceso: string = <string>req.query._idAcceso;
        const rutaLogotipoPerfil: string = path.join(RUTA_IMAGENES_ACCESOS, `${_idAcceso}/logotipo/`);
        verificarRuta(rutaLogotipoPerfil);
        cb(null, rutaLogotipoPerfil);
    }
})
//SUBIR ARCHIVOS FISCALES
const almacenamientoCertificado = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${req.params.idArchivoFiscal}.cer`)
    },
    destination: function (req, file, cb) {
        const ruta: string = path.join(RUTA_ARCHIVOS_FISCALES);
        verificarRuta(ruta);
        cb(null, ruta);
    }
});
const almacenamientoLlave = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${req.params.idArchivoFiscal}.key`)
    },
    destination: function (req, file, cb) {
        const ruta: string = path.join(RUTA_ARCHIVOS_FISCALES);
        verificarRuta(ruta);
        cb(null, ruta);
    }
})
export let subirImagenProducto              = multer({ storage: almacenamientoImagenProducto });
export let subirImagenSlide                 = multer({ storage: almacenamientoImagenSlide });
export let subirImagenBanner                = multer({ storage: almacenamientoImagenBanner });
export let subirImagenComprobantePago       = multer({ storage: almacenamientoImagenComprobanteDePago });
export let subirPdfComprobantePago          = multer({ storage: almacenamientoPdfComprobanteDePago });
export let subirFotoPerfilAcceso            = multer({ storage: almacenamientoFotoPerfilAcceso });
export let subirLogotipoPerfilAcceso            = multer({ storage: almacenamientoLogotipoPerfilAcceso });
export let subirImagenVerificacionDeAcceso  = multer({ storage: almacenamientoImagenVerificacionDeAcceso });
export let subirPdfVerificacionDeAcceso     = multer({ storage: almacenamientoPdfVerificacionDeAcceso });
//SUBIR ARCHIVOS FISCALES
export let subirCertificado = multer({ storage: almacenamientoCertificado });
export let subirLlave = multer({ storage: almacenamientoLlave });

/* FUNCIONES AUXILIARES */
function verificarRuta(ruta: string) {
    let separador: string;
    switch (process.platform) {
        case 'win32': separador = '\\';
            break;
        default: separador = '\/';
            break;
    }
    const rutaSeparada: string[] = ruta.split(separador);
    let carpetasSeparadas: string = '';
    for (let carpeta of rutaSeparada) {
        carpetasSeparadas += carpeta + separador;
        if (!fs.existsSync(carpetasSeparadas)) {
            fs.mkdirSync(carpetasSeparadas);
        }
    }
}
