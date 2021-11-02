import { Router } from 'express';
import * as codigosPostalesCtrl from '../controladores/codigosPostales';
import {autenticacionMiddleware} from "../../middlewares/autenticacion";

const codigosPostalesRutas = Router();


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   G  E  T   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
codigosPostalesRutas.get('/obtener-codigos-postales', codigosPostalesCtrl.obtenerCodigosPostales);
codigosPostalesRutas.get('/filtrar-codigos-postales-por-clave', codigosPostalesCtrl.filtrarCodigosPostalesPorClave);
codigosPostalesRutas.get('/obtener-claves-codigos-postales', codigosPostalesCtrl.obtenerClavesCodigosPostales);
codigosPostalesRutas.get('/obtener-codigo-postal', autenticacionMiddleware, codigosPostalesCtrl.obtenerCodigoPostal);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * P  O  S  T * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   P  U  T   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  P  A  T  C  H  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  D  E  L  E  T  E  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */


export default codigosPostalesRutas;
