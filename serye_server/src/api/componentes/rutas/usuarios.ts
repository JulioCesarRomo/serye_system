import { Router } from 'express';
import * as UsuariosCtrl from '../controladores/usuarios';
import { autenticacionMiddleware } from '../../middlewares/autenticacion';
//import { rootVendedorAdministradorMiddleware } from '../../middlewares/rootVendedorAdministrador';
//import { subirFotoUsuario } from '../servicios/almacenamiento';
//import { prepararAlmacenamientoImagenPerfil } from '../../middlewares/prepararAlmacenamientoImagenPerfil';

const usuariosRutas = Router();


/* GET */
//usuariosRutas.get('/perfil/informacion-general', autenticacionMiddleware, UsuariosCtrl.obtenerInfoGeneralPerfilUsuario);
//usuariosRutas.get('/perfil/informacion-de-contacto', autenticacionMiddleware, UsuariosCtrl.obtenerInfoContactoPerfilUsuario);
//usuariosRutas.get('/perfil/direccion', autenticacionMiddleware, UsuariosCtrl.obtenerDireccionPerfilUsuario);
//usuariosRutas.get('/perfil/foto', autenticacionMiddleware, UsuariosCtrl.obtenerFotografiaPerfilUsuario);
//usuariosRutas.get('/:idUsuario/horarios', autenticacionMiddleware, UsuariosCtrl.obtenerHorariosUsuario);
//usuariosRutas.get('/:idUsuario/informacion-general', autenticacionMiddleware, UsuariosCtrl.obtenerInfoGeneralUsuario);
//usuariosRutas.get('/:idUsuario/informacion-de-contacto', autenticacionMiddleware, UsuariosCtrl.obtenerInfoContactoUsuario);
//usuariosRutas.get('/:idUsuario/direccion', autenticacionMiddleware, UsuariosCtrl.obtenerDireccionUsuario);
//usuariosRutas.get('/:idUsuario/foto', autenticacionMiddleware, UsuariosCtrl.obtenerFotografiaUsuario);
//usuariosRutas.get('/:idUsuario/permisos', autenticacionMiddleware, UsuariosCtrl.obtenerPermisosUsuario);
usuariosRutas.get('/nombre-de-usuario', autenticacionMiddleware, UsuariosCtrl.existeNombreUsuario);
//usuariosRutas.get('/inactivos', autenticacionMiddleware, UsuariosCtrl.obtenerUsuariosInactivos);
//usuariosRutas.get('/administradores', autenticacionMiddleware, UsuariosCtrl.obtenerUsuariosAdministradores);
//usuariosRutas.get('/perfil', autenticacionMiddleware, UsuariosCtrl.obtenerPerfilUsuario);
usuariosRutas.get('/filtro', autenticacionMiddleware, UsuariosCtrl.obtenerUsuariosFiltrados);
usuariosRutas.get('/num-usuarios', autenticacionMiddleware, UsuariosCtrl.obtenerNumUsuariosFiltrados);
//usuariosRutas.get('/cont-num-usuarios', autenticacionMiddleware, UsuariosCtrl.obtenerNumUsuarios);
//usuariosRutas.get('/:idUsuario', autenticacionMiddleware, UsuariosCtrl.obtenerUsuario);
//usuariosRutas.get('', autenticacionMiddleware, UsuariosCtrl.obtenerUsuarios);

/* POST */
//usuariosRutas.post('', autenticacionMiddleware, UsuariosCtrl.guardarUsuario);

/* PUT */
//usuariosRutas.put('/:idUsuario', autenticacionMiddleware, rootVendedorAdministradorMiddleware, UsuariosCtrl.actualizarUsuario);

/* PATCH */
//usuariosRutas.patch('/perfil/informacion-general', autenticacionMiddleware, UsuariosCtrl.actualizarInfoGeneralPerfilUsuario);
//usuariosRutas.patch('/perfil/informacion-de-contacto', autenticacionMiddleware, UsuariosCtrl.actualizarInfoContactoPerfilUsuario);
//usuariosRutas.patch('/perfil/direccion', autenticacionMiddleware, UsuariosCtrl.actualizarDireccionPerfilUsuario);
//usuariosRutas.patch('/perfil/foto', autenticacionMiddleware, prepararAlmacenamientoImagenPerfil, subirFotoUsuario.single('foto'), UsuariosCtrl.actualizarFotografiaPerfilUsuario);
//usuariosRutas.patch('/perfil/contrasena', autenticacionMiddleware, UsuariosCtrl.actualizarContrasenaPerfilUsuario);
//usuariosRutas.patch('/personalizacion/tema', autenticacionMiddleware, UsuariosCtrl.actualizarTema);
//usuariosRutas.patch('/:idUsuario/horarios', autenticacionMiddleware, UsuariosCtrl.actualizarHorariosUsuario);
//usuariosRutas.patch('/:idUsuario/informacion-general', autenticacionMiddleware, UsuariosCtrl.actualizarInfoGeneralUsuario);
//usuariosRutas.patch('/:idUsuario/informacion-de-contacto', autenticacionMiddleware, UsuariosCtrl.actualizarInfoContactoUsuario);
//usuariosRutas.patch('/:idUsuario/direccion', autenticacionMiddleware, UsuariosCtrl.actualizarDireccionUsuario);
//usuariosRutas.patch('/:idUsuario/foto', autenticacionMiddleware, subirFotoUsuario.single('foto'), UsuariosCtrl.actualizarFotografiaUsuario);
//usuariosRutas.patch('/:idUsuario/permisos', autenticacionMiddleware, UsuariosCtrl.actualizarPermisosUsuario);
//usuariosRutas.patch('/:idUsuario/contrasena', autenticacionMiddleware, UsuariosCtrl.actualizarContrasenaUsuario);
//usuariosRutas.patch('/:idUsuario', autenticacionMiddleware, UsuariosCtrl.cambiarEstadoUsuario);

export default usuariosRutas;
