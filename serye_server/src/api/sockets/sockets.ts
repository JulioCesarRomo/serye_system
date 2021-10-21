import { Socket } from 'socket.io';
import Usuario from '../clases/usuario';
import ListaUsuarios from '../clases/listaUsuarios';
export var usuariosConectados: ListaUsuarios = new ListaUsuarios();

export const obtenerUsuariosConectados = () => {
    return usuariosConectados;
}

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        usuariosConectados.eliminarUsuario(cliente.id);
    });
}

/*export const actualizarDatosUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('actualizando-usuario', (usuario: Usuario, cb: Function) => {
        usuariosConectados.actualizarDatos(cliente.id, usuario._id, usuario.conectado, usuario.tipo, usuario._idSucursal, usuario._idEmpresa, usuario._idAccesoUsuario);
        cb({ ok: true, mensaje: 'Usuario configurado' })
    })
}*/

export const cerrarSesion = (cliente: Socket) => {
    cliente.on('cerrar-sesion', (usuario: Usuario, cb: Function) => {
        usuariosConectados.actualizarDatos(cliente.id, '', false, -1, '', '', '');
        cb({ ok: true, mensaje: 'Usuario no disponible' });
    })
}
