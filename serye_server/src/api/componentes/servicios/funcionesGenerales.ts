import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import momento from 'moment';
import {RUTA_IMAGEN_DEFECTO_PRODUCTO, RUTA_IMAGENES_ACCESOS, SECRETA} from "../../../config/globales";
import fs from "fs";


export function transformarFechaConHora(fecha: Date) {
    return fecha ? momento(fecha).locale('es').format('DD/MM/YY, h:mm:ss a'): '-';
}

export function transformarFechaSinHora(fecha: Date) {
    return fecha ? momento(fecha).locale('es').format('DD/MM/YY'): '-';
}

export function formatearSerial(valor: string) {
    // La entrada debe de tener una longitud de 24 y se debe conformar de letras y números.
    return (String(valor).substring(0, 4)
        + ' - ' + String(valor).substring(4, 8)
        + ' - ' + String(valor).substring(8, 12)
        + ' - ' + String(valor).substring(12, 16)
        + ' - ' + String(valor).substring(16, 20)
        + ' - ' + String(valor).substring(20, 24)).toUpperCase();
}

export function transformarTipoPrecio(precio: number | string) {
    return('$ ' +  Number(precio).toFixed(2));
}

//FUNCION PARA ELIMINAR ARCHIVOS EN EL SERVIDOR
export function eliminarArchivo(ruta: string) {
    fs.unlinkSync(ruta);
}
//CASTEAR CANTIDADES A DOS DIGITOS ( 1 ==> 01 )
function castearADosDigitos(numero: number): string {
    if (numero <= 9) {
        return ('0' + numero);
    } else {
        return numero.toString();
    }
}
//REDONDEAR A DOS DECIMALES CANTIDADES
export function redondearDosDecimales(numero: number) {
    return parseFloat(String(Math.round(numero * 100) / 100)).toFixed(2);
}
export function _desencriptarCadena(cadenaEncriptada: string) {
    const CryptoJS = require('crypto-js');
    const cadenaDesencriptada = CryptoJS.AES.decrypt(cadenaEncriptada, SECRETA);
    return cadenaDesencriptada.toString(CryptoJS.enc.Utf8);
}
export function verificarRuta(ruta: string) {
    let separador: string;
    switch (process.platform) {
        case 'win32': separador = '\\';
            break;
        default: separador = '\/';
            break;
    }
    const rutaSeparada: string[] = ruta.split(separador);
    let carpetasSeparadas = '';
    for (const carpeta of rutaSeparada) {
        carpetasSeparadas += carpeta + separador;
        if (!fs.existsSync(carpetasSeparadas)) {
            fs.mkdirSync(carpetasSeparadas);
        }
    }
}
/***<><><><><><><><><><><><><><><> F U N C I O N E S   R E L A C I O N A D A S <><><><><><><><><><><><><><><><><><>***/
/***<><><><><><><><><><><><><><><><><><> C O N   E L   T I M B R A D O <><><><><><><><><><><><><><><><><><><><><><>***/
/***<><><><><><><><><><><><><><><><><><><><> D E   F A C T U R A S <><><><><><><><><><><><><><><><><><><><><><><><>***/
//OBTENER LA FECHA ACTUAL EN FORMATO SOLICITADO POR EL SAT
export function obtenerFechaActualFormatoSat():string {
    let fechaActual = new Date(Date.now());
    return(
        fechaActual.getFullYear() + '-' +
        castearADosDigitos(fechaActual.getMonth() + 1) + '-' +
        castearADosDigitos(fechaActual.getDate()) + 'T' +
        castearADosDigitos(fechaActual.getHours()) + ':' +
        castearADosDigitos(fechaActual.getMinutes()) + ':' +
        castearADosDigitos(fechaActual.getSeconds())
    );
}
export function cambiarCaracteresEspecialesParaTimbradoDeXml(cadena: string){
    if(isNotNullOrUndefined(cadena)){
        cadena = cadena.replace(/&/g, '&amp;');
        cadena = cadena.replace(/‘/g, '&apos;');
        cadena = cadena.replace(/\|/g, '');
        cadena = cadena.replace(/“/g, '&quot;');
        cadena = cadena.replace(/</g, '&lt;');
        cadena = cadena.replace(/>/g, '&gt;');
        return(cadena);
    } else {
        return '';
    }
}
export function obtenerCantidadProductoSAT(cantidadE: number): string {
    const cantidad = Number(cantidadE).toFixed(3);
    const digitosFaltantes = 6 - cantidad.toString().split('.')[1].length || 0;
    let cantidadSAT = cantidad.toString();
    for (let i = 0; i < digitosFaltantes; i++) {
        cantidadSAT = cantidadSAT + '0';
    }
    return cantidadSAT;
}
export function obtenerTasaOCuota(number: number){
    const cantidad = Number(number/100).toFixed(6);
    const digitosFaltantes = 6 - cantidad.toString().split('.')[1].length || 0;
    let cantidadSAT = cantidad.toString();
    for (let i = 0; i < digitosFaltantes; i++) {
        cantidadSAT = cantidadSAT + '0';
    }
    return cantidadSAT;
}
