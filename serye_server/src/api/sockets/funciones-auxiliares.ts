import { Response } from 'express';
import Servidor from "../clases/servidor";
import * as Socket from './sockets';
import { TiposUsuario } from '../enumeraciones/tipos-usuarios.enum';
//import { FuncionesSocketsPorIdUsuario } from '../enumeraciones/funciones-sockets-por-id-usuario.enum';


/*export function emitirElementoIdAccesoUsuario(tipoElemento: number, elemento: any, res: Response, _idAccesoUsuario: string) {
    const servidor = Servidor.instance;
    for (let usuarioConectado of Socket.usuariosConectados.lista) {
        if (usuarioConectado !== undefined &&
            (usuarioConectado.tipo == TiposUsuario.Administrador || usuarioConectado.tipo == TiposUsuario.Empleado) &&
            usuarioConectado._id != res.locals.usuario._id &&
            usuarioConectado._idAccesoUsuario == _idAccesoUsuario) {
            switch (tipoElemento) {
                case 2: servidor.io.in(usuarioConectado.id).emit('administrando-folios-usuario', elemento); break;
            }
        }
    }
}*/

/*export function emitirElementoIdSucursal(tipoElemento: number, elemento: any, _idSucursal: string, _idEmpresa: string, res: Response) {
    for (let usuarioConectado of Socket.usuariosConectados.lista) {
        if (usuarioConectado !== undefined &&
            usuarioConectado._id != res.locals.usuario._id &&
            (usuarioConectado.tipo == TiposUsuario.Administrador || usuarioConectado.tipo == TiposUsuario.Empleado) &&
            usuarioConectado._idSucursal == _idSucursal &&
            usuarioConectado._idEmpresa == _idEmpresa &&
            usuarioConectado._idAccesoUsuario == res.locals.usuario._idAccesoUsuario) {
            switch (tipoElemento) {
                case 0: emitir(usuarioConectado.id, 'disminucion-folio-sucursal', elemento); break;
                case 1: emitir(usuarioConectado.id, 'existe-usuario-facturando-sucursal', elemento); break;
                case 3: emitir(usuarioConectado.id, 'actualizar-folio', elemento); break;
                case 4: emitir(usuarioConectado.id, 'nueva-existencia-por-ubicacion', elemento); break;
                case 5: emitir(usuarioConectado.id, 'nueva-cantidad-existencia-por-ubicacion', elemento); break;
                case 6: emitir(usuarioConectado.id, 'nuevas-series', elemento); break;
                case 7: emitir(usuarioConectado.id, 'nuevos-lotes', elemento); break;
                case 8: emitir(usuarioConectado.id, 'bloqueo-existencia', elemento); break;
                case 9: emitir(usuarioConectado.id, 'existencia-por-ubicacion-eliminada', elemento); break;
                case 10: emitir(usuarioConectado.id, 'baja-cantidad-existencia-por-ubicacion', elemento); break;
                /!* FOLIOS CFDI DE NÓMINA *!/
                case 11: emitir(usuarioConectado.id, 'disminucion-folio-nomina-sucursal', elemento); break;
                case 12: emitir(usuarioConectado.id, 'existe-usuario-timbrando-nomina-sucursal', elemento); break;
                case 13: emitir(usuarioConectado.id, 'actualizar-folio-nomina', elemento); break;
                /!* * * * * * * * * * * * *!/
                case 14: emitir(usuarioConectado.id, 'nueva-cantidad-apartada-existencia-por-ubicacion', elemento); break;
                case 15: emitir(usuarioConectado.id, 'baja-cantidad-apartada-existencia-por-ubicacion', elemento); break;
            }
        }
    }
}*/

/*export function emitirElementoIdUsuario(tipoElemento: number, elemento: any, _idUsuario: string) {
    Socket.usuariosConectados.lista.findIndex(usuarioConectado => {
        return usuarioConectado !== undefined && usuarioConectado._id == _idUsuario;
    })
    for (let usuarioConectado of Socket.usuariosConectados.lista) {
        if (usuarioConectado !== undefined &&
            usuarioConectado._id == _idUsuario) {
            switch (tipoElemento) {
                case FuncionesSocketsPorIdUsuario.ActualizarInfoGeneralUsuario: emitir(usuarioConectado.id, 'actualizar-info-general-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.ActualizarFotografiaUsuario: emitir(usuarioConectado.id, 'actualizar-fotografia-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.NuevaTransferenciaCaja: emitir(usuarioConectado.id, 'nueva-transferencia-caja', elemento); break;
                case FuncionesSocketsPorIdUsuario.CancelacionTransferenciaCaja: emitir(usuarioConectado.id, 'cancelacion-transferencia-caja', elemento); break;
                case FuncionesSocketsPorIdUsuario.ActualizarChatUsuario: emitir(usuarioConectado.id, 'actualizar-mensajes-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.ActualizarPermisosUsuario: emitir(usuarioConectado.id, 'actualizar-permisos-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.AsignacionSoporte: emitir(usuarioConectado.id, 'asignar-soporte', elemento); break;
                case FuncionesSocketsPorIdUsuario.ActualizarEstadoChat: emitir(usuarioConectado.id, 'actualizar-estado-conversacion', elemento); break;
                case FuncionesSocketsPorIdUsuario.NuevaNotificacion: emitir(usuarioConectado.id, 'nueva-notificacion', elemento); break;
            }
            break;
        }
    }
}*/

/*export function emitirElementoIdUsuarioYSucursal(tipoElemento: number, elemento: any, _idUsuario: string, _idSucursal: string, _idEmpresa: string) {
    Socket.usuariosConectados.lista.findIndex(usuarioConectado => {
        return usuarioConectado !== undefined && usuarioConectado._id == _idUsuario;
    })
    for (let usuarioConectado of Socket.usuariosConectados.lista) {
        if (usuarioConectado !== undefined &&
            usuarioConectado._id == _idUsuario &&
            (usuarioConectado.tipo == TiposUsuario.Administrador || usuarioConectado.tipo == TiposUsuario.Empleado) &&
            usuarioConectado._idSucursal == _idSucursal &&
            usuarioConectado._idEmpresa == _idEmpresa) {
            switch (tipoElemento) {
                case FuncionesSocketsPorIdUsuario.ActualizarInfoGeneralUsuario: emitir(usuarioConectado.id, 'actualizar-info-general-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.ActualizarFotografiaUsuario: emitir(usuarioConectado.id, 'actualizar-fotografia-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.NuevaTransferenciaCaja: emitir(usuarioConectado.id, 'nueva-transferencia-caja', elemento); break;
                case FuncionesSocketsPorIdUsuario.CancelacionTransferenciaCaja: emitir(usuarioConectado.id, 'cancelacion-transferencia-caja', elemento); break;
                case FuncionesSocketsPorIdUsuario.ActualizarChatUsuario: emitir(usuarioConectado.id, 'actualizar-mensajes-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.ActualizarPermisosUsuario: emitir(usuarioConectado.id, 'actualizar-permisos-usuario', elemento); break;
                case FuncionesSocketsPorIdUsuario.NuevaNotificacion: emitir(usuarioConectado.id, 'nueva-notificacion', elemento); break;
            }
            break;
        }
    }
}*/

/*
export function emitirElementoIdUsuarioSoporte(tipoElemento: number, elemento: any) {
    Socket.usuariosConectados.lista.findIndex(usuarioConectado => {
        return usuarioConectado !== undefined
    })
    for (let usuarioConectado of Socket.usuariosConectados.lista) {
        if (usuarioConectado !== undefined && usuarioConectado.tipo == TiposUsuario.Root) {
            switch (tipoElemento) {
                case FuncionesSocketsPorIdUsuario.NuevoChatSoporte: emitir(usuarioConectado.id, 'nuevo-chat-soporte', elemento); break;
            }
            break;
        }
    }
}
*/

/* FUNCIONES AUXILIARES */
/*function emitir(id: string, evento: string, datos: any) {
    const servidor = Servidor.instance;
    servidor.io.in(id).emit(evento, datos);
}*/

