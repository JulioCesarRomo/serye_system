import Usuario from "./usuario";

export default class ListaUsuarios {
    lista: Usuario[];

    constructor() {
        this.lista = [];
    }

    agregarUsuario(usuario: Usuario): Usuario {
        this.lista.push(usuario);
        console.log('UNOOO')
        return usuario;
    }
    actualizarDatos(id: string, _id: string, conectado: boolean, tipo: number, _idSucursal: string, _idEmpresa: string, _idAccesoUsuario: string) {
        const indice = this.lista.findIndex(usuario => {
            return usuario.id == id
        });
        this.lista[indice]._id = _id;
        this.lista[indice].conectado = conectado;
        this.lista[indice].tipo = tipo;
        this.lista[indice]._idSucursal = _idSucursal;
        this.lista[indice]._idEmpresa = _idEmpresa;
        this.lista[indice]._idAccesoUsuario = _idAccesoUsuario;
        //this.existeSesionPreviaUsuario(id, _id)
    }

    /*existeSesionPreviaUsuario(id: string, idUsuario: string) {
        const servidor = Servidor.instance;
        const usuarioConectado = Socket.usuariosConectados.lista.find(usuarioConectado => {
            return usuarioConectado._id == idUsuario && usuarioConectado.conectado == true && usuarioConectado.id != id;
        })
        if (usuarioConectado) {
            servidor.io.in(usuarioConectado.id).emit('existe-sesion-previa-usuario', true);
        }
    }*/

    obtenerListaUsuarios() {
        return this.lista;
    }
    obtenerUsuario(_id: string): Usuario | undefined {
        return this.lista.find(usuario => {
            return usuario._id == _id
        });
    }
    eliminarUsuario(id: string): Usuario | undefined {
        const usuarioTemporal: Usuario | undefined = this.obtenerUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return usuarioTemporal;
    }
}
