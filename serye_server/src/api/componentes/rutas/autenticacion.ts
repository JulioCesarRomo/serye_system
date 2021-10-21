import { Router } from 'express';
import * as AutenticacionCtrl from '../controladores/autenticacion';
import {autenticacionMiddleware} from "../../middlewares/autenticacion";
const autenticacionRutas = Router();

/* GET */

/* POST */
autenticacionRutas.post('/iniciar-sesion', AutenticacionCtrl.iniciarSesionUsuario);
/* PUT */

/* PATCH */
autenticacionRutas.patch('/sesion', autenticacionMiddleware, AutenticacionCtrl.cerrarSesionUsuario);
autenticacionRutas.patch('/codigo-recuperacion', AutenticacionCtrl.crearCodigoRecuperacion);
autenticacionRutas.patch('/contrasena', AutenticacionCtrl.recuperarContrasena);

export default autenticacionRutas;
