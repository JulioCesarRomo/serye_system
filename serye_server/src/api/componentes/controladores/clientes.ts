import { Request, Response } from 'express';
import { NativeError, Types } from 'mongoose';
import { obtenerArrayDeStringsParaBusquedaFlexible } from '../../compartido/funciones/busqueda';
import { verificarDireccion } from '../../compartido/funciones/validaciones-generales';
import { RFC_GENERICO } from '../../constantes/rfc-generico.constant';
import { EstadoOrdenDeVenta } from '../../enumeraciones/estado-orden-de-venta.enum';
import { TipoDeCliente } from '../../enumeraciones/tipos-de-clientes.enum';
import { TiposDePersona } from '../../enumeraciones/tipos-de-persona.enum';
import { TiposModulos } from '../../enumeraciones/tipos-modulos-enum';
import { TiposUsuario } from '../../enumeraciones/tipos-usuarios.enum';
import { Cliente, ICliente } from '../modelos/cliente.model';
import { Pais } from '../modelos/pais.model';
import { verificarTelefonos } from './usuarios';

/* GET */
export let obtenerEstadoActualDeCreditoCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerEstadoActualDeCreditoClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva);
            break;
        case TiposUsuario.Empleado:
            _obtenerEstadoActualDeCreditoClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerInfoGeneralCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosInfoGeneralCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosInfoGeneralCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerInfoGeneralClienteKiosco = (req: Request, res: Response) => {
    const rfc: string = String(req.query.rfc);
    _obtenerDatosClienteAdministradorEmpleadoKiosco(rfc, DatosActivosInactivosCliente, res);
}
export let obtenerDireccionEnvioCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosDireccionEnvioCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosDireccionEnvioCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerDatosFiscalesCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosDatosFiscalesCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosDatosFiscalesCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerInfoContactoCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosInfoContactoCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosInfoContactoCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerListaPreciosCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosListaPreciosCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosListaPreciosCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerLimiteDeCreditoCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosLimiteDeCreditoCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosLimiteDeCreditoCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerFotoCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosFotografiaCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosFotografiaCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

export let obtenerRestriccionDeUsuariosCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosRestriccionDeUsuariosCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosRestriccionDeUsuariosCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

export let obtenerClientesSinMembresias = (req: Request, res: Response) => {
    const filtro: string = String(req.query.filtro);
    const inicio: number = Number(req.query.inicio);
    const fin: number = Number(req.query.fin);
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerClientesSinMembresiasAdministradorEmpleado(filtro, res.locals.usuario.sucursalActiva, inicio, fin, res);
            break;
        case TiposUsuario.Empleado:
            _obtenerClientesSinMembresiasAdministradorEmpleado(filtro, res.locals.usuario._idSucursal, inicio, fin, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

export let obtenerClientesConRestriccionDeUsuarios = (req: Request, res: Response) => {
    const filtro: string = String(req.query.filtro);
    const activo: boolean = req.query.activo == 'true' ? true : false;
    const inicio: number = Number(req.query.inicio);
    const fin: number = Number(req.query.fin);
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerClientesFiltradosParaPuntoDeVentaAdministradorEmpleado(filtro, activo, res.locals.usuario.sucursalActiva, inicio, fin, res);
            break;
        case TiposUsuario.Empleado:
            _obtenerClientesFiltradosParaPuntoDeVentaAdministradorEmpleado(filtro, activo, res.locals.usuario._idSucursal, inicio, fin, res);
            // _obtenerClientesConRestriccionDeUsuariosAdministradorEmpleado(filtro, activo, res.locals.usuario._idSucursal, inicio, fin, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

export let obtenerNumClientes = (req: Request, res: Response) => {
    let activo: boolean = req.query.activo == 'true' ? true : false;
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerNumClientesAdministradorEmpleado(res.locals.usuario.sucursalActiva, activo, res);
            break;
        case TiposUsuario.Empleado:
            _obtenerNumClientesAdministradorEmpleado(res.locals.usuario._idSucursal, activo, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerClientesInactivos = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerClientesActivosInactivosAdministradorEmpleado(false, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _obtenerClientesActivosInactivosAdministradorEmpleado(false, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let validarRfcExistente = async (req: Request, res: Response) => {
    const rfc: string = String(req.query.rfc);
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
        case TiposUsuario.Empleado:
            const clienteRfcRepetido: ICliente | null = await validarClientePorRFC(rfc, res.locals.usuario._idEmpresa, res.locals.usuario._idAccesoUsuario, req.query._idExcluido ? String(req.query._idExcluido) : undefined);
            if (clienteRfcRepetido) return res.status(200).json(true);
            else return res.status(200).json(false);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let validarRfcExistenteKiosco = async (req: Request, res: Response) => {
    const rfc: string = String(req.query.rfc);
    const clienteRfcRepetido: ICliente | null = await validarClientePorRFCKiosco(rfc);
    if (clienteRfcRepetido) return res.status(200).json(true);
    else return res.status(200).json(false);
}
export let obtenerClientesFiltrados = (req: Request, res: Response) => {
    const filtro: string = String(req.query.filtro);
    const activo: boolean = req.query.activo == 'true' ? true : false;
    const inicio: number = Number(req.query.inicio);
    const fin: number = Number(req.query.fin);
    let _idSucursal: string;
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _idSucursal = res.locals.usuario.sucursalActiva;
            break;
        case TiposUsuario.Empleado:
            _idSucursal = res.locals.usuario._idSucursal;
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
    switch (res.locals.usuario.moduloActivo) {
        case TiposModulos.Facturacion:
            _obtenerClientesFiltradosParaFacturacionAdministradorEmpleado(filtro, activo, _idSucursal, inicio, fin, res);
            break;
        case TiposModulos.PuntoVenta:
            _obtenerClientesFiltradosParaPuntoDeVentaAdministradorEmpleado(filtro, activo, _idSucursal, inicio, fin, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerNumClientesFiltrados = (req: Request, res: Response) => {
    const filtro: string = String(req.query.filtro);
    const activo: boolean = req.query.activo == 'true' ? true : false;
    let _idSucursal: string;
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _idSucursal = res.locals.usuario.sucursalActiva;
            break;
        case TiposUsuario.Empleado:
            _idSucursal = res.locals.usuario._idSucursal;
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
    switch (res.locals.usuario.moduloActivo) {
        case TiposModulos.Facturacion:
            _obtenerNumClientesFiltradosParaFacturacionAdministradorEmpleado(filtro, activo, _idSucursal, res);
            break;
        case TiposModulos.PuntoVenta:
            _obtenerNumClientesFiltradosParaPuntoDeVentaAdministradorEmpleado(filtro, activo, _idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerClientePorDefecto = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerClientePorDefectoAdministradorEmpleado(res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _obtenerClientePorDefectoAdministradorEmpleado(res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerCliente = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario.sucursalActiva, DatosCliente);
            break;
        case TiposUsuario.Empleado:
            _obtenerDatosClienteAdministradorEmpleado(res, req.params.idCliente, res.locals.usuario._idSucursal, DatosCliente);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let obtenerClientesActivos = (req: Request, res: Response) => {
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _obtenerClientesActivosInactivosAdministradorEmpleado(true, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _obtenerClientesActivosInactivosAdministradorEmpleado(true, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

/* POST */
export let guardarClienteGenerico = (req: Request, res: Response) => {
    const clienteGenerico: ICliente = new Cliente(req.body);
    clienteGenerico.default = true;
    clienteGenerico.tipoDePersona = TiposDePersona.Ninguna;
    clienteGenerico.nombre = 'Venta al público';
    clienteGenerico.rfc = RFC_GENERICO;
    clienteGenerico.omitirDireccionFacturacion = true;
    clienteGenerico.direccionFacturacion = null;
    clienteGenerico.listaPrecios.fechaRegistro = new Date(Date.now());
    clienteGenerico._idSucursal = req.params.idSucursal;
    clienteGenerico._idEmpresa = res.locals.usuario._idEmpresa;
    clienteGenerico._idAccesoUsuario = res.locals.usuario._idAccesoUsuario;
    clienteGenerico._idUsuario = res.locals.usuario._id;
    clienteGenerico.fechaRegistro = new Date(Date.now());
    clienteGenerico.save((err: any, clienteGuardado: ICliente) => {
        return res.status(200).json(clienteGuardado);
    })
}
export let guardarCliente = async (req: Request, res: Response) => {
    const cliente = new Cliente(req.body);
    const importacion: boolean = req.query.importacion == 'true' ? true : false;
    const resp = validarCamposCliente(cliente, importacion);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            const clienteRfcRepetidoAdministrador: ICliente | null = await validarClientePorRFC(cliente.rfc, res.locals.usuario._idEmpresa, res.locals.usuario._idAccesoUsuario);
            if (clienteRfcRepetidoAdministrador) {
                if (clienteRfcRepetidoAdministrador.activo) return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Activos"' });
                else return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Eliminados"' });
            }
            _guardarClienteAdministradorEmpleado(cliente, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            const clienteRfcRepetidoEmpleado: ICliente | null = await validarClientePorRFC(cliente.rfc, res.locals.usuario._idEmpresa, res.locals.usuario._idAccesoUsuario);
            if (clienteRfcRepetidoEmpleado) {
                if (clienteRfcRepetidoEmpleado.activo) return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Activos"' });
                else return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Eliminados"' });
            }
            _guardarClienteAdministradorEmpleado(cliente, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

/* PUT */
export let actualizarCliente = async (req: Request, res: Response) => {
    const _id: string = req.params.idCliente;
    const cliente = new Cliente(req.body);
    const resp = validarCamposCliente(cliente, false);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            const clienteRfcRepetidoAdministrador: ICliente | null = await validarClientePorRFC(cliente.rfc, res.locals.usuario._idEmpresa, res.locals.usuario._idAccesoUsuario, _id);
            if (clienteRfcRepetidoAdministrador) {
                if (clienteRfcRepetidoAdministrador.activo) return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Activos"' });
                else return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Eliminados"' });
            }
            _actualizarClienteAdministradorEmpleado(cliente, _id, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            const clienteRfcRepetidoEmpleado: ICliente | null = await validarClientePorRFC(cliente.rfc, res.locals.usuario._idEmpresa, res.locals.usuario._idAccesoUsuario, _id);
            if (clienteRfcRepetidoEmpleado) {
                if (clienteRfcRepetidoEmpleado.activo) return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Activos"' });
                else return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Eliminados"' });
            }
            _actualizarClienteAdministradorEmpleado(cliente, _id, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

/* PATCH */
export let actualizarInfoGeneralCliente = (req: Request, res: Response) => {
    const _id: string = req.params.idCliente;
    const cliente = new Cliente(req.body);
    const resp = validarCamposClienteInfoGeneral(cliente);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _actualizarInfoGeneralClienteAdministradorEmpleado(cliente, _id, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _actualizarInfoGeneralClienteAdministradorEmpleado(cliente, _id, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let actualizarDireccionEnvioCliente = (req: Request, res: Response) => {
    const _id: string = req.params.idCliente;
    const cliente = new Cliente(req.body);
    const resp = validarCamposClienteDireccionEnvio(cliente.direccionEnvio, false);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    let datosActualizar = {};
    if (!cliente.direccionesIguales) datosActualizar = { direccionEnvio: cliente.direccionEnvio, direccionesIguales: cliente.direccionesIguales, omitirDireccionEnvio: cliente.omitirDireccionEnvio }
    else datosActualizar = { direccionEnvio: cliente.direccionEnvio, direccionesIguales: cliente.direccionesIguales, direccionFacturacion: cliente.direccionEnvio, omitirDireccionEnvio: cliente.omitirDireccionEnvio }
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _actualizarDireccionEnvioClienteAdministradorEmpleado(_id, res.locals.usuario.sucursalActiva, datosActualizar, res);
            break;
        case TiposUsuario.Empleado:
            _actualizarDireccionEnvioClienteAdministradorEmpleado(_id, res.locals.usuario._idSucursal, datosActualizar, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let actualizarDatosFiscalesCliente = async (req: Request, res: Response) => {
    const _id: string = req.params.idCliente;
    const cliente = new Cliente(req.body);
    const resp = validarCamposClienteDatosFiscales(cliente, false);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            const clienteRfcRepetidoAdministrador: ICliente | null = await validarClientePorRFC(cliente.rfc, res.locals.usuario._idEmpresa, res.locals.usuario._idAccesoUsuario, _id);
            if (clienteRfcRepetidoAdministrador) {
                if (clienteRfcRepetidoAdministrador.activo) return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Activos"' });
                else return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Eliminados"' });
            }
            _actualizarDatosFiscalesClienteAdministradorEmpleado(cliente, _id, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            const clienteRfcRepetidoEmpleado: ICliente | null = await validarClientePorRFC(cliente.rfc, res.locals.usuario._idEmpresa, res.locals.usuario._idAccesoUsuario, _id);
            if (clienteRfcRepetidoEmpleado) {
                if (clienteRfcRepetidoEmpleado.activo) return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Activos"' });
                else return res.status(400).send({ titulo: 'El RFC ya existe', detalles: 'Actualmente ya existe un cliente registrado con el RFC ' + cliente.rfc + '. Favor de revisar dicho cliente en la sección de "Eliminados"' });
            }
            _actualizarDatosFiscalesClienteAdministradorEmpleado(cliente, _id, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let actualizarInfoContactoCliente = (req: Request, res: Response) => {
    const _id: string = req.params.idCliente;
    const cliente = new Cliente(req.body);
    const resp = validarCamposClienteContacto(cliente);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _actualizarInfoContactoClienteAdministradorEmpleado(cliente, _id, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _actualizarInfoContactoClienteAdministradorEmpleado(cliente, _id, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let actualizarListaPreciosCliente = (req: Request, res: Response) => {
    const _id: string = req.params.idCliente;
    const cliente = new Cliente(req.body);
    const resp = validarCamposClienteListaPrecios(cliente);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _actualizarListaPreciosClienteAdministradorEmpleado(cliente, _id, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _actualizarListaPreciosClienteAdministradorEmpleado(cliente, _id, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let actualizarLimiteDeCreditoCliente = (req: Request, res: Response) => {
    const _id: string = req.params.idCliente;
    const cliente = new Cliente(req.body);
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _actualizarLimiteDeCreditoAdministradorEmpleado(cliente, _id, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _actualizarLimiteDeCreditoAdministradorEmpleado(cliente, _id, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let actualizarFotoCliente = (req: Request, res: Response) => {
    let rutaFoto: string = req.file.path.slice(req.file.path.indexOf('administradores'));
    const nombreFoto: string = req.file.filename;
    const _id: string = req.params.idCliente;
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _actualizarFotografiaClienteAdministradorEmpleado({ rutaFoto, nombreFoto }, _id, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _actualizarFotografiaClienteAdministradorEmpleado({ rutaFoto, nombreFoto }, _id, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}
export let actualizarRestriccionDeUsuariosCliente = (req: Request, res: Response) => {
    const cliente: ICliente = new Cliente(req.body);
    const resp = validarCamposClienteRestriccionDeUsuarios(cliente);
    if (resp.error) return res.status(400).send({ titulo: resp.titulo, detalles: resp.detalles });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _actualizarRestriccionDeUsuariosClienteAdministradorEmpleado(req.params.idCliente, cliente, res.locals.usuario.sucursalActiva, res);
            break;
        case TiposUsuario.Empleado:
            _actualizarRestriccionDeUsuariosClienteAdministradorEmpleado(req.params.idCliente, cliente, res.locals.usuario._idSucursal, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

export let cambiarEstadoCliente = (req: Request, res: Response) => {
    const activo: boolean = req.body.activo;
    const _id: string = req.params.idCliente;
    if (activo == null) return res.status(400).send({ titulo: 'Campo activo requerido', detalles: 'Por favor, ingresa el campo activo' });
    switch (res.locals.usuario.tipo) {
        case TiposUsuario.Administrador:
            _cambiarEstadoClienteAdministradorEmpleado(_id, res.locals.usuario.sucursalActiva, activo, res);
            break;
        case TiposUsuario.Empleado:
            _cambiarEstadoClienteAdministradorEmpleado(_id, res.locals.usuario._idSucursal, activo, res);
            break;
        default: return res.status(401).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })
    }
}

/* CONSTANTES DE FILTROS DE INFORMACION */
const DatosActivosInactivosCliente = { _id: 1, tipoDePersona: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, rfc: 1, correo: 1, activo: 1, default: 1 };
const DatosInfoGeneralCliente = { tipo: 1, tipoDePersona: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1 };
const DatosDireccionEnvioCliente = { direccionEnvio: 1, direccionesIguales: 1, omitirDireccionEnvio: 1, omitirDireccionFacturacion: 1 };
const DatosDatosFiscalesCliente = { tipo: 1, ciudad: 1, estado: 1, _idPais: 1, tipoDePersona: 1, rfc: 1, direccionEnvio: 1, direccionesIguales: 1, direccionFacturacion: 1, omitirDireccionEnvio: 1, omitirDireccionFacturacion: 1, _idUsoDelCfdi: 1 };
const DatosInfoContactoCliente = { correo: 1, telefonos: 1, tieneRepresentante: 1, nombreRepresentante: 1, apepatRepresentante: 1, apematRepresentante: 1 };
const DatosFotografiaCliente = { nombreFoto: 1, rutaFoto: 1 };
const DatosRestriccionDeUsuariosCliente = { restriccionDeUsuarios: 1, usuariosHabilitados: 1 };
const DatosListaPreciosCliente = { listaPrecios: 1 };
const DatosLimiteDeCreditoCliente = { tieneLimiteDeCredito: 1, cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1 };
const DatosCliente = { fechaRegistro: 0, activo: 0, _idSucursal: 0, _idEmpresa: 0, _idAccesoUsuario: 0, _idUsuario: 0, __v: 0 };

/* FUNCIONES PARA OBTENER CLIENTES FILTRADOS POR MÓDULO ACTIVO */
//FACTURACIÓN
function _obtenerClientesFiltradosParaFacturacionAdministradorEmpleado(filtro: string, activo: boolean, _idSucursal: string, inicio: number, fin: number, res: Response) {
    Cliente.aggregate()
        .match({
            _idEmpresa: Types.ObjectId(res.locals.usuario._idEmpresa),
            _idAccesoUsuario: Types.ObjectId(res.locals.usuario._idAccesoUsuario),
            activo,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal: Types.ObjectId(_idSucursal) }
            ]
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, listaPrecios: 1, tipo: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            ciudad: 1, estado: 1, _idPais: 1,
            nombreCompleto: {
                $concat: [
                    { $ifNull: ['$nombre', ''] },
                    " ",
                    { $ifNull: ['$apepat', ''] },
                    " ",
                    { $ifNull: ['$apemat', ''] },
                ]
            },
            tipoPersonaCliente: {
                $switch: {
                    branches: [
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] }, then: "fisica" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] }, then: "moral" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] }, then: "ninguna" }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, listaPrecios: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            tipoPersonaCliente: 1, tipo: 1, ciudad: 1, estado: 1, _idPais: 1,
            rfcEnArray: {
                $cond: {
                    if: {
                        $or: [
                            { $eq: ['$rfc', ''] },
                            { $eq: ['$rfc', null] },
                            { $eq: ['$rfc', undefined] }
                        ]
                    },
                    then: null,
                    else: ['$rfc']
                }
            },
            razonSocialSeparadaPorEspacios: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $split: [{ $trim: { input: { $toString: '$razonSocial' } } }, ' '] }
                        }
                    ]
                }
            },
            razonSocialOrdenar: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $trim: { input: { $toLower: { $toString: '$nombreCompleto' } } } }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $trim: { input: { $toLower: { $toString: '$nombreCompleto' } } } }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $trim: { input: { $toLower: { $toString: '$razonSocial' } } } }
                        }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, listaPrecios: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1, tipo: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1, razonSocialOrdenar: 1,
            ciudad: 1, estado: 1, _idPais: 1,
            busqueda: {
                $cond: {
                    if: { $eq: ['$rfcEnArray', null] },
                    then: '$razonSocialSeparadaPorEspacios',
                    else: { $concatArrays: ['$rfcEnArray', '$razonSocialSeparadaPorEspacios'] }
                }
            }
        })
        .match({
            $or: [
                {
                    busqueda: { $all: obtenerArrayDeStringsParaBusquedaFlexible(filtro) }
                },
                { correo: { $regex: filtro, $options: "i" } },
                { tipoPersonaCliente: { $regex: filtro, $options: "i" } }
            ]
        })
        .lookup({
            from: 'listaprecios', localField: 'listaPrecios._idListaPrecios',
            foreignField: '_id', as: 'listaPrecios._idListaPrecios',
        })
        .unwind({ path: '$listaPrecios._idListaPrecios', preserveNullAndEmptyArrays: true })
        .lookup({
            from: 'paises',
            localField: '_idPais',
            foreignField: '_id',
            as: '_idPais'
        })
        .unwind({ path: '$_idPais', preserveNullAndEmptyArrays: true })
        .sort({ razonSocialOrdenar: 1 })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tipo: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            ciudad: 1, estado: 1, _idPais: 1,
            'listaPrecios._idListaPrecios._id': 1,
            'listaPrecios._idListaPrecios.nombre': 1,
            'listaPrecios._idListaPrecios.default': 1,
            'listaPrecios._idListaPrecios.porcentajeDescuento': 1,
            'listaPrecios._idListaPrecios.tipo': 1
        })
        .skip(inicio)
        .limit(fin)
        .exec((err: NativeError, clientes: ICliente[]) => {
            return res.status(200).json(clientes);
        })
}

//PUNTO DE VENTA
function _obtenerClientesSinMembresiasAdministradorEmpleado(filtro: string, _idSucursal: string, inicio: number, fin: number, res: Response) {
    let fechaHoy = new Date();
    fechaHoy.setHours(0);
    fechaHoy.setMinutes(0);
    fechaHoy.setSeconds(0);
    fechaHoy.setMilliseconds(0);
    Cliente.aggregate()
        .match({
            _idEmpresa: Types.ObjectId(res.locals.usuario._idEmpresa),
            _idAccesoUsuario: Types.ObjectId(res.locals.usuario._idAccesoUsuario),
            activo: true,
            $or: [
                { default: false },
                { default: null }
            ]
        })
        .project({
            nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, rutaFoto: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, nombreCompleto: {
                $concat: [
                    { $ifNull: ['$nombre', ''] },
                    " ",
                    { $ifNull: ['$apepat', ''] },
                    " ",
                    { $ifNull: ['$apemat', ''] },
                ]
            },
        })
        .project({
            nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, rutaFoto: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, nombreCompleto: 1,
            rfcEnArray: {
                $cond: {
                    if: {
                        $or: [
                            { $eq: ['$rfc', ''] },
                            { $eq: ['$rfc', null] },
                            { $eq: ['$rfc', undefined] }
                        ]
                    },
                    then: null,
                    else: ['$rfc']
                }
            },
            razonSocialSeparadaPorEspacios: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $split: [{ $trim: { input: { $toString: '$razonSocial' } } }, ' '] }
                        }
                    ]
                }
            }
        })
        .project({
            nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, rutaFoto: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, nombreCompleto: 1,
            rfcEnArray: 1, razonSocialSeparadaPorEspacios: 1,
            busqueda: {
                $cond: {
                    if: { $eq: ['$rfcEnArray', null] },
                    then: { $concatArrays: [['$correo'], '$razonSocialSeparadaPorEspacios'] },
                    else: { $concatArrays: ['$rfcEnArray', '$razonSocialSeparadaPorEspacios', ['$correo']] }
                }
            }
        })
        .match({
            busqueda: { $all: obtenerArrayDeStringsParaBusquedaFlexible(filtro) }
        })
        .lookup({
            from: 'membresiaclientes', localField: '_id',
            foreignField: '_idCliente', as: 'membresiasCliente',
        })
        .project({
            nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, rutaFoto: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, nombreCompleto: 1,
            rfcEnArray: 1, razonSocialSeparadaPorEspacios: 1,
            membresiasClientesFiltradas: {
                $map: {
                    input: {
                        $filter: {
                            input: '$membresiasCliente',
                            as: 'membresiaCliente',
                            cond: {
                                $and: [
                                    {
                                        $eq: ['$$membresiaCliente.activo', true]
                                    },
                                    { $gte: ['$$membresiaCliente.fechaFin', fechaHoy] }
                                ]
                            }
                        }
                    },
                    as: 'membresiaFiltrada',
                    in: {
                        nombre: '$$membresiaFiltrada.nombre'
                    }
                }
            }
        })
        .match({ membresiasClientesFiltradas: [] })
        .skip(inicio)
        .limit(fin)
        .exec((err: NativeError, clientes: ICliente[]) => {
            return res.status(200).json(clientes);
        })
}

function _obtenerClientesFiltradosParaPuntoDeVentaAdministradorEmpleado(filtro: string, activo: boolean, _idSucursal: string, inicio: number, fin: number, res: Response) {
    Cliente.aggregate()
        .match({
            _idEmpresa: Types.ObjectId(res.locals.usuario._idEmpresa),
            _idAccesoUsuario: Types.ObjectId(res.locals.usuario._idAccesoUsuario),
            activo,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal: Types.ObjectId(_idSucursal) }
            ]
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, saldoAFavor: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1, tipo: 1, _idUsoDelCfdi: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: {
                $concat: [
                    { $ifNull: ['$nombre', ''] },
                    " ",
                    { $ifNull: ['$apepat', ''] },
                    " ",
                    { $ifNull: ['$apemat', ''] },
                ]
            },
            tipoPersonaCliente: {
                $switch: {
                    branches: [
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] }, then: "fisica" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] }, then: "moral" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] }, then: "ninguna" }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, saldoAFavor: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1, tipo: 1, _idUsoDelCfdi: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1, rfcEnArray: {
                $cond: {
                    if: {
                        $or: [
                            { $eq: ['$rfc', ''] },
                            { $eq: ['$rfc', null] },
                            { $eq: ['$rfc', undefined] }
                        ]
                    },
                    then: null,
                    else: ['$rfc']
                }
            },
            razonSocialSeparadaPorEspacios: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $split: [{ $trim: { input: { $toString: '$razonSocial' } } }, ' '] }
                        }
                    ]
                }
            },
            razonSocialOrdenar: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $trim: { input: { $toLower: { $toString: '$nombreCompleto' } } } }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $trim: { input: { $toLower: { $toString: '$nombreCompleto' } } } }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $trim: { input: { $toLower: { $toString: '$razonSocial' } } } }
                        }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, saldoAFavor: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1, tipo: 1, _idUsoDelCfdi: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1, rfcEnArray: 1, razonSocialSeparadaPorEspacios: 1,
            razonSocialOrdenar: 1,
            busqueda: {
                $cond: {
                    if: { $eq: ['$rfcEnArray', null] },
                    then: '$razonSocialSeparadaPorEspacios',
                    else: { $concatArrays: ['$rfcEnArray', '$razonSocialSeparadaPorEspacios'] }
                }
            }
        })
        .match({
            $or: [
                { busqueda: { $all: obtenerArrayDeStringsParaBusquedaFlexible(filtro) } },
                { correo: { $regex: filtro, $options: "i" } },
                { tipoPersonaCliente: { $regex: filtro, $options: "i" } }
            ]
        })
        .sort({ razonSocialOrdenar: 1 })
        .skip(inicio)
        .limit(fin)
        .lookup({
            from: 'listaprecios', localField: 'listaPrecios._idListaPrecios',
            foreignField: '_id', as: 'listaPrecios._idListaPrecios',
        })
        .unwind({ path: '$listaPrecios._idListaPrecios', preserveNullAndEmptyArrays: true })
        .lookup({
            from: 'ordendeventas', localField: '_id',
            foreignField: '_idCliente', as: 'ordenesDeVenta',
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, saldoAFavor: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1, tipo: 1, _idUsoDelCfdi: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            razonSocialOrdenar: 1, ordenDeVenta: {
                $map: {
                    input: {
                        $filter: {
                            input: '$ordenesDeVenta',
                            as: 'ordenDeVenta',
                            cond: {
                                $eq: ['$$ordenDeVenta.estadoActual.estado', EstadoOrdenDeVenta.PendienteDePago]
                            }
                        }
                    },
                    as: 'ordenDeVenta',
                    in: {
                        _id: '$$ordenDeVenta._id',
                        folio: '$$ordenDeVenta.folio',
                        fechaRegistro: '$$ordenDeVenta.fechaRegistro',
                        estadoActual: '$$ordenDeVenta.estadoActual',
                        impSaldoInsoluto: '$$ordenDeVenta.impSaldoInsoluto',
                        _idUsuario: '$$ordenDeVenta._idUsuario'
                    }
                }
            },
        })
        .unwind({ path: '$ordenDeVenta', preserveNullAndEmptyArrays: true })
        .match({
            $or: [
                { ordenDeVenta: null },
                {
                    ordenDeVenta: { $ne: null },
                    'ordenDeVenta.estadoActual.estado': EstadoOrdenDeVenta.PendienteDePago
                }
            ]
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, saldoAFavor: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1, tipo: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            razonSocialOrdenar: 1, ordenDeVenta: 1, _idUsoDelCfdi: 1,
        })
        .group({
            _id: '$_id',
            activo: { $first: '$activo' },
            nombre: { $first: '$nombre' },
            apepat: { $first: '$apepat' },
            apemat: { $first: '$apemat' },
            razonSocial: { $first: '$razonSocial' },
            rfc: { $first: '$rfc' },
            correo: { $first: '$correo' },
            saldoAFavor: { $first: '$saldoAFavor' },
            tipoDePersona: { $first: '$tipoDePersona' },
            tieneLimiteDeCredito: { $first: '$tieneLimiteDeCredito' },
            cantidadLimiteDeCredito: { $first: '$cantidadLimiteDeCredito' },
            limitarDiasDeCredito: { $first: '$limitarDiasDeCredito' },
            diasLimiteDeCredito: { $first: '$diasLimiteDeCredito' },
            listaPrecios: { $first: '$listaPrecios' },
            omitirDireccionFacturacion: { $first: '$omitirDireccionFacturacion' },
            direccionFacturacion: { $first: '$direccionFacturacion' },
            razonSocialOrdenar: { $first: '$razonSocialOrdenar' },
            ordenesDeVenta: { $push: '$ordenDeVenta' },
            totalDeAdeudo: { $sum: '$ordenDeVenta.impSaldoInsoluto' },
            tipo: { $first: '$tipo' },
            _idUsoDelCfdi: { $first: '$_idUsoDelCfdi' }
        })
        .sort({ razonSocialOrdenar: 1 })
        .lookup({
            from: 'membresiaclientes',
            localField: '_id',
            foreignField: '_idCliente',
            as: 'membresiasCliente'
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, saldoAFavor: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1, razonSocialOrdenar: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            'listaPrecios._idListaPrecios._id': 1, 'listaPrecios._idListaPrecios.nombre': 1,
            'listaPrecios._idListaPrecios.default': 1, 'listaPrecios._idListaPrecios.porcentajeDescuento': 1,
            'listaPrecios._idListaPrecios.tipo': 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            ordenesDeVenta: 1, totalDeAdeudo: 1, tipo: 1, _idUsoDelCfdi: 1,
            membresiasActivas: {
                $map: {
                    input: {
                        $filter: {
                            input: '$membresiasCliente',
                            as: 'membresiaCliente',
                            cond: { $eq: ['$$membresiaCliente.activo', true] }
                        }
                    },
                    as: 'membresiaFiltrada',
                    in: {
                        _id: '$$membresiaFiltrada._id',
                        nombre: '$$membresiaFiltrada.nombre',
                        fechaRegistro: '$$membresiaFiltrada.fechaRegistro',
                        fechaInicio: '$$membresiaFiltrada.fechaInicio',
                        fechaFin: '$$membresiaFiltrada.fechaFin',
                        precio: '$$membresiaFiltrada.precio',
                        _idMembresia: '$$membresiaFiltrada._idMembresia',
                    }
                }
            }
        })
        .unwind({ path: '$membresiasActivas', preserveNullAndEmptyArrays: true })
        .lookup({
            from: 'membresias',
            localField: 'membresiasActivas._idMembresia',
            foreignField: '_id',
            as: 'membresiasActivas._idMembresia'
        })
        .unwind({ path: '$membresiasActivas._idMembresia', preserveNullAndEmptyArrays: true })
        .sort({ 'membresiasActivas.fechaRegistro': -1 })
        .group({
            _id: '$_id',
            activo: { $first: '$activo' }, nombre: { $first: '$nombre' }, apepat: { $first: '$apepat' }, apemat: { $first: '$apemat' },
            razonSocial: { $first: '$razonSocial' }, rfc: { $first: '$rfc' }, correo: { $first: '$correo' }, tipoDePersona: { $first: '$tipoDePersona' },
            tieneLimiteDeCredito: { $first: '$tieneLimiteDeCredito' }, cantidadLimiteDeCredito: { $first: '$cantidadLimiteDeCredito' },
            limitarDiasDeCredito: { $first: '$limitarDiasDeCredito' }, diasLimiteDeCredito: { $first: '$diasLimiteDeCredito' },
            listaPrecios: { $first: '$listaPrecios' }, omitirDireccionFacturacion: { $first: '$omitirDireccionFacturacion' },
            direccionFacturacion: { $first: '$direccionFacturacion' }, ordenesDeVenta: { $first: '$ordenesDeVenta' },
            totalDeAdeudo: { $first: '$totalDeAdeudo' }, saldoAFavor: { $first: '$saldoAFavor' }, membresiaActivaActual: { $first: '$membresiasActivas' },
            razonSocialOrdenar: { $first: '$razonSocialOrdenar' }, tipo: { $first: '$tipo' }, ciudad: { $first: '$ciudad' },
            estado: { $first: '$estado' }, _idPais: { $first: '$_idPais' }, _idUsoDelCfdi: { $first: '$_idUsoDelCfdi' }
        })
        .sort({ razonSocialOrdenar: 1 })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1, rfc: 1,
            correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1, cantidadLimiteDeCredito: 1,
            limitarDiasDeCredito: 1, diasLimiteDeCredito: 1, listaPrecios: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1, ordenesDeVenta: 1,
            totalDeAdeudo: 1, saldoAFavor: 1, tipo: 1, _idUsoDelCfdi: 1,
            membresiaActiva: {
                $cond: {
                    if: {
                        $eq: ['$membresiaActivaActual', {}]
                    },
                    then: null,
                    else: '$membresiaActivaActual'
                }
            }
        })
        .lookup({
            from: 'csat_usocfdis',
            localField: '_idUsoDelCfdi',
            foreignField: '_id',
            as: '_idUsoDelCfdi'
        })
        .unwind({ path: '$_idUsoDelCfdi', preserveNullAndEmptyArrays: true })
        // .skip(inicio)
        // .limit(fin)
        .sort({ razonSocialOrdenar: 1 })
        .exec((err: NativeError, clientes: ICliente[]) => {
            return res.status(200).json(clientes);
        })
}

/* FUNCIONES PARA OBTENER EL NUMERO DE CLIENTES FILTRADOS POR MÓDULO ACTIVO */
//FACTURACIÓN
function _obtenerNumClientesFiltradosParaFacturacionAdministradorEmpleado(filtro: string, activo: boolean, _idSucursal: string, res: Response) {
    Cliente.aggregate()
        .match({
            _idEmpresa: Types.ObjectId(res.locals.usuario._idEmpresa),
            _idAccesoUsuario: Types.ObjectId(res.locals.usuario._idAccesoUsuario),
            activo,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal: Types.ObjectId(_idSucursal) }
            ]
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, listaPrecios: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: {
                $concat: [
                    { $ifNull: ['$nombre', ''] },
                    " ",
                    { $ifNull: ['$apepat', ''] },
                    " ",
                    { $ifNull: ['$apemat', ''] },
                ]
            },
            tipoPersonaCliente: {
                $switch: {
                    branches: [
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] }, then: "fisica" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] }, then: "moral" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] }, then: "ninguna" }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, listaPrecios: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            tipoPersonaCliente: 1,
            rfcEnArray: {
                $cond: {
                    if: {
                        $or: [
                            { $eq: ['$rfc', ''] },
                            { $eq: ['$rfc', null] },
                            { $eq: ['$rfc', undefined] }
                        ]
                    },
                    then: null,
                    else: ['$rfc']
                }
            },
            razonSocialSeparadaPorEspacios: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $split: [{ $trim: { input: { $toString: '$razonSocial' } } }, ' '] }
                        }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, listaPrecios: 1,
            omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1, razonSocialOrdenar: 1,
            busqueda: {
                $cond: {
                    if: { $eq: ['$rfcEnArray', null] },
                    then: '$razonSocialSeparadaPorEspacios',
                    else: { $concatArrays: ['$rfcEnArray', '$razonSocialSeparadaPorEspacios'] }
                },
            }
        })
        .match({
            $or: [
                {
                    busqueda: { $all: obtenerArrayDeStringsParaBusquedaFlexible(filtro) }
                },
                { correo: { $regex: filtro, $options: "i" } },
                { tipoPersonaCliente: { $regex: filtro, $options: "i" } }
            ]
        })
        .group({
            _id: null,
            total: { $sum: 1 }
        })
        .exec((err: NativeError, resultado: any[]) => {
            if (!resultado[0]) return res.status(200).json(0);
            else return res.status(200).json(resultado[0].total);
        })
}

//PUNTO DE VENTA
function _obtenerNumClientesFiltradosParaPuntoDeVentaAdministradorEmpleado(filtro: string, activo: boolean, _idSucursal: string, res: Response) {
    Cliente.aggregate()
        .match({
            _idEmpresa: Types.ObjectId(res.locals.usuario._idEmpresa),
            _idAccesoUsuario: Types.ObjectId(res.locals.usuario._idAccesoUsuario),
            activo,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal: Types.ObjectId(_idSucursal) }
            ]
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: {
                $concat: [
                    { $ifNull: ['$nombre', ''] },
                    " ",
                    { $ifNull: ['$apepat', ''] },
                    " ",
                    { $ifNull: ['$apemat', ''] },
                ]
            },
            tipoPersonaCliente: {
                $switch: {
                    branches: [
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] }, then: "fisica" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] }, then: "moral" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] }, then: "ninguna" }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1,
            rfcEnArray: {
                $cond: {
                    if: {
                        $or: [
                            { $eq: ['$rfc', ''] },
                            { $eq: ['$rfc', null] },
                            { $eq: ['$rfc', undefined] }
                        ]
                    },
                    then: null,
                    else: ['$rfc']
                }
            },
            razonSocialSeparadaPorEspacios: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $split: [{ $trim: { input: { $toString: '$razonSocial' } } }, ' '] }
                        }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1, rfcEnArray: 1, razonSocialSeparadaPorEspacios: 1,
            busqueda: {
                $cond: {
                    if: { $eq: ['$rfcEnArray', null] },
                    then: '$razonSocialSeparadaPorEspacios',
                    else: { $concatArrays: ['$rfcEnArray', '$razonSocialSeparadaPorEspacios'] }
                },
            }
        })
        .match({
            $or: [
                {
                    busqueda: { $all: obtenerArrayDeStringsParaBusquedaFlexible(filtro) }
                },
                { correo: { $regex: filtro, $options: "i" } },
                { tipoPersonaCliente: { $regex: filtro, $options: "i" } }
            ]
        })
        .group({
            _id: null,
            total: { $sum: 1 }
        })
        .exec((err: NativeError, resultado: any[]) => {
            if (!resultado[0]) return res.status(200).json(0);
            else return res.status(200).json(resultado[0].total);
        })
}

/* FUNCIONES PARA OBTENER EL CLIENTE POR DEFECTO POR ROL */
function _obtenerClientePorDefectoAdministradorEmpleado(_idSucursal: string, res: Response) {
    Cliente.findOne()
        .where({ default: true, _idSucursal, _idAccesoUsuario: res.locals.usuario._idAccesoUsuario })
        .select(DatosActivosInactivosCliente)
        .exec((err: NativeError, clientes: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al obtener al cliente por defecto', detalles: 'Ocurrio un error al obtener al cliente por defecto, por favor intentalo de nuevo mas tarde' });
            return res.status(200).json(clientes);
        })
}
/* FUNCIONES PARA OBTENER EL ESTADO ACTUAL DEL CRÉDITO DE UN CLIENTE POR ROL DE USUARIO */
function _obtenerEstadoActualDeCreditoClienteAdministradorEmpleado(res: Response, _id: string, _idSucursal: string) {
    Cliente.aggregate()
        .match({
            _id: Types.ObjectId(_id),
            _idEmpresa: Types.ObjectId(res.locals.usuario._idEmpresa),
            _idAccesoUsuario: Types.ObjectId(res.locals.usuario._idAccesoUsuario),
            activo: true,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal: Types.ObjectId(_idSucursal) }
            ]
        })
        .project({
            tieneLimiteDeCredito: 1, cantidadLimiteDeCredito: 1,
            limitarDiasDeCredito: 1, diasLimiteDeCredito: 1
        })
        .lookup({
            from: 'ordendeventas', localField: '_id',
            foreignField: '_idCliente', as: 'ordenesDeVenta',
        })
        .project({
            tieneLimiteDeCredito: 1, cantidadLimiteDeCredito: 1,
            limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            ordenDeVenta: {
                $map: {
                    input: {
                        $filter: {
                            input: '$ordenesDeVenta',
                            as: 'ordenDeVenta',
                            cond: {
                                $eq: ['$$ordenDeVenta.estadoActual.estado', EstadoOrdenDeVenta.PendienteDePago]
                            }
                        }
                    },
                    as: 'ordenDeVenta',
                    in: {
                        _id: '$$ordenDeVenta._id',
                        folio: '$$ordenDeVenta.folio',
                        fechaRegistro: '$$ordenDeVenta.fechaRegistro',
                        estadoActual: '$$ordenDeVenta.estadoActual',
                        impSaldoInsoluto: '$$ordenDeVenta.impSaldoInsoluto'
                    }
                }
            },
        })
        .unwind({ path: '$ordenDeVenta', preserveNullAndEmptyArrays: true })
        .match({
            $or: [
                { ordenDeVenta: null },
                {
                    ordenDeVenta: { $ne: null },
                    'ordenDeVenta.estadoActual.estado': EstadoOrdenDeVenta.PendienteDePago
                }
            ]
        })
        .project({
            tieneLimiteDeCredito: 1, cantidadLimiteDeCredito: 1,
            limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            ordenDeVenta: 1
        })
        .group({
            _id: '$_id',
            tieneLimiteDeCredito: { $first: '$tieneLimiteDeCredito' },
            cantidadLimiteDeCredito: { $first: '$cantidadLimiteDeCredito' },
            limitarDiasDeCredito: { $first: '$limitarDiasDeCredito' },
            diasLimiteDeCredito: { $first: '$diasLimiteDeCredito' },
            ordenesDeVenta: { $push: '$ordenDeVenta' },
            totalDeAdeudo: { $sum: '$ordenDeVenta.impSaldoInsoluto' }
        })
        .project({
            tieneLimiteDeCredito: 1, cantidadLimiteDeCredito: 1,
            limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            ordenesDeVenta: 1, totalDeAdeudo: 1
        })
        .exec((err: NativeError, clientes: ICliente[]) => {
            if (err) return res.status(422).send({ titulo: 'Error al obtener el estado actual del crédito del cliente', detalles: 'Ocurrio un error al obtener el estado actual del crédito del cliente, por favor intentalo de nuevo mas tarde' });
            else {
                if (clientes == null || clientes.length == 0) return res.status(404).send({ titulo: 'Error al obtener el estado actual del crédito del cliente', detalles: 'Ocurrio un error al obtener el estado actual del crédito del cliente, posiblemente no exista' });
                else return res.status(200).json(clientes[0]);
            }
        })
}

/* FUNCIONES PARA OBTENER DATOS ESPECIFICOS DE UN CLIENTE POR ROL DE USUARIO */
function _obtenerDatosClienteAdministradorEmpleado(res: Response, _id: string, _idSucursal: string, datosUsuario: any) {
    Cliente.findOne()
        .where({
            _id,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        })
        .select(datosUsuario)
        .populate('direccionEnvio.idEstado')
        .populate({ path: 'direccionEnvio.idCiudad', select: '_id id nombre' })
        .populate({ path: 'direccionEnvio.idCodigoPostal', select: '_id id codigo' })
        .populate('direccionFacturacion.idEstado')
        .populate({ path: 'direccionFacturacion.idCiudad', select: '_id id nombre' })
        .populate({ path: 'direccionFacturacion.idCodigoPostal', select: '_id id codigo' })
        .populate('_idUsoDelCfdi')
        .populate({ path: 'listaPrecios._idListaPrecios', model: 'ListaPrecios', select: '_id id nombre default tipo porcentajeDescuento' })
        .populate({ path: '_idPais', model: Pais })
        .exec((err: NativeError, cliente: ICliente | null) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al obtener los datos del cliente', detalles: 'Ocurrio un error al obtener los datos del cliente, por favor intentalo de nuevo mas tarde' });
            }
            if (!cliente) return res.status(404).send({ titulo: 'Error al obtener los datos del cliente', detalles: 'Ocurrio un error al obtener los datos del cliente, posiblemente no exista' });
            else return res.status(200).json(cliente);
        })
}

function _obtenerDatosClienteAdministradorEmpleadoKiosco(rfc: string, datosUsuario: any, res: Response) {
    Cliente.findOne()
        .where({ rfc })
        .populate('direccionEnvio.idEstado')
        .populate({ path: 'direccionEnvio.idCiudad', select: '_id id nombre' })
        .populate({ path: 'direccionEnvio.idCodigoPostal', select: '_id id codigo' })
        .populate('direccionFacturacion.idEstado')
        .populate({ path: 'direccionFacturacion.idCiudad', select: '_id id nombre' })
        .populate({ path: 'direccionFacturacion.idCodigoPostal', select: '_id id codigo' })
        .populate('_idUsoDelCfdi')
        .populate({ path: 'listaPrecios._idListaPrecios', model: 'ListaPrecios', select: '_id id nombre default tipo porcentajeDescuento' })
        .select(datosUsuario)
        .exec((err: NativeError, cliente: ICliente | null) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al obtener los datos del cliente', detalles: 'Ocurrio un error al obtener los datos del cliente, por favor intentalo de nuevo mas tarde' });
            }
            if (!cliente) return res.status(404).send({ titulo: 'Error al obtener los datos del cliente', detalles: 'Ocurrio un error al obtener los datos del cliente, posiblemente no exista' });
            else return res.status(200).json(cliente);
        })
}

/* */
function _obtenerClientesConRestriccionDeUsuariosAdministradorEmpleado(filtro: string, activo: boolean, _idSucursal: string, inicio: number, fin: number, res: Response) {
    Cliente.aggregate()
        .match({
            _idEmpresa: Types.ObjectId(res.locals.usuario._idEmpresa),
            _idAccesoUsuario: Types.ObjectId(res.locals.usuario._idAccesoUsuario),
            activo,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal: Types.ObjectId(_idSucursal) }
            ]
        })
        .match({
            $or: [
                { restriccionDeUsuarios: false },
                { restriccionDeUsuarios: undefined },
                { restriccionDeUsuarios: null },
                {
                    restriccionDeUsuarios: true,
                    'usuariosHabilitados._idUsuario': Types.ObjectId(res.locals.usuario._id)
                }
            ]
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: {
                $concat: [
                    { $ifNull: ['$nombre', ''] },
                    " ",
                    { $ifNull: ['$apepat', ''] },
                    " ",
                    { $ifNull: ['$apemat', ''] },
                ]
            },
            tipoPersonaCliente: {
                $switch: {
                    branches: [
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] }, then: "fisica" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] }, then: "moral" },
                        { case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] }, then: "ninguna" }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1,
            rfcEnArray: {
                $cond: {
                    if: {
                        $or: [
                            { $eq: ['$rfc', ''] },
                            { $eq: ['$rfc', null] },
                            { $eq: ['$rfc', undefined] }
                        ]
                    },
                    then: null,
                    else: ['$rfc']
                }
            },
            razonSocialSeparadaPorEspacios: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $split: [{ $trim: { input: { $toString: '$nombreCompleto' } } }, ' '] }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $split: [{ $trim: { input: { $toString: '$razonSocial' } } }, ' '] }
                        }
                    ]
                }
            },
            razonSocialOrdenar: {
                $switch: {
                    branches: [
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Fisica] },
                            then: { $trim: { input: { $toLower: { $toString: '$nombreCompleto' } } } }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Ninguna] },
                            then: { $trim: { input: { $toLower: { $toString: '$nombreCompleto' } } } }
                        },
                        {
                            case: { $eq: ['$tipoDePersona', TiposDePersona.Moral] },
                            then: { $trim: { input: { $toLower: { $toString: '$razonSocial' } } } }
                        }
                    ]
                }
            }
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            nombreCompleto: 1, tipoPersonaCliente: 1, rfcEnArray: 1, razonSocialSeparadaPorEspacios: 1,
            razonSocialOrdenar: 1,
            busqueda: {
                $cond: {
                    if: { $eq: ['$rfcEnArray', null] },
                    then: '$razonSocialSeparadaPorEspacios',
                    else: { $concatArrays: ['$rfcEnArray', '$razonSocialSeparadaPorEspacios'] }
                },
            }
        })
        .match({
            $or: [
                {
                    busqueda: { $all: obtenerArrayDeStringsParaBusquedaFlexible(filtro) }
                },
                { correo: { $regex: filtro, $options: "i" } },
                { tipoPersonaCliente: { $regex: filtro, $options: "i" } }
            ]
        })
        .lookup({
            from: 'listaprecios', localField: 'listaPrecios._idListaPrecios',
            foreignField: '_id', as: 'listaPrecios._idListaPrecios',
        })
        .unwind({ path: '$listaPrecios._idListaPrecios', preserveNullAndEmptyArrays: true })
        .lookup({
            from: 'ordendeventas', localField: '_id',
            foreignField: '_idCliente', as: 'ordenesDeVenta',
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            razonSocialOrdenar: 1,
            ordenDeVenta: {
                $map: {
                    input: {
                        $filter: {
                            input: '$ordenesDeVenta',
                            as: 'ordenDeVenta',
                            cond: {
                                $eq: ['$$ordenDeVenta.estadoActual.estado', EstadoOrdenDeVenta.PendienteDePago]
                            }
                        }
                    },
                    as: 'ordenDeVenta',
                    in: {
                        _id: '$$ordenDeVenta._id',
                        folio: '$$ordenDeVenta.folio',
                        fechaRegistro: '$$ordenDeVenta.fechaRegistro',
                        estadoActual: '$$ordenDeVenta.estadoActual',
                        impSaldoInsoluto: '$$ordenDeVenta.impSaldoInsoluto',
                        _idUsuario: '$$ordenDeVenta._idUsuario'
                    }
                }
            },
        })
        .unwind({ path: '$ordenDeVenta', preserveNullAndEmptyArrays: true })
        .match({
            $or: [
                { ordenDeVenta: null },
                {
                    ordenDeVenta: { $ne: null },
                    'ordenDeVenta.estadoActual.estado': EstadoOrdenDeVenta.PendienteDePago
                }
            ]
        })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            listaPrecios: 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            razonSocialOrdenar: 1, ordenDeVenta: 1
        })
        .group({
            _id: '$_id',
            activo: { $first: '$activo' },
            nombre: { $first: '$nombre' },
            apepat: { $first: '$apepat' },
            apemat: { $first: '$apemat' },
            razonSocial: { $first: '$razonSocial' },
            rfc: { $first: '$rfc' },
            correo: { $first: '$correo' },
            tipoDePersona: { $first: '$tipoDePersona' },
            tieneLimiteDeCredito: { $first: '$tieneLimiteDeCredito' },
            cantidadLimiteDeCredito: { $first: '$cantidadLimiteDeCredito' },
            limitarDiasDeCredito: { $first: '$limitarDiasDeCredito' },
            diasLimiteDeCredito: { $first: '$diasLimiteDeCredito' },
            listaPrecios: { $first: '$listaPrecios' },
            omitirDireccionFacturacion: { $first: '$omitirDireccionFacturacion' },
            direccionFacturacion: { $first: '$direccionFacturacion' },
            razonSocialOrdenar: { $first: '$razonSocialOrdenar' },
            ordenesDeVenta: { $push: '$ordenDeVenta' },
            totalDeAdeudo: { $sum: '$ordenDeVenta.impSaldoInsoluto' }
        })
        .sort({ razonSocialOrdenar: 1 })
        .project({
            activo: 1, nombre: 1, apepat: 1, apemat: 1, razonSocial: 1,
            rfc: 1, correo: 1, tipoDePersona: 1, tieneLimiteDeCredito: 1,
            cantidadLimiteDeCredito: 1, limitarDiasDeCredito: 1, diasLimiteDeCredito: 1,
            'listaPrecios._idListaPrecios._id': 1, 'listaPrecios._idListaPrecios.nombre': 1,
            'listaPrecios._idListaPrecios.default': 1, 'listaPrecios._idListaPrecios.porcentajeDescuento': 1,
            'listaPrecios._idListaPrecios.tipo': 1, omitirDireccionFacturacion: 1, direccionFacturacion: 1,
            ordenesDeVenta: 1, totalDeAdeudo: 1
        })
        .skip(inicio)
        .limit(fin)
        .exec((err: NativeError, clientes: ICliente[]) => {
            return res.status(200).json(clientes);
        })
}

/* FUNCIONES PARA OBTENER EL NUM DE CLIENTES POR ROL */
function _obtenerNumClientesAdministradorEmpleado(_idSucursal: string, activo: boolean, res: Response) {
    Cliente.find()
        .where({
            activo,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        })
        .countDocuments()
        .exec((err: NativeError, numProductos: number) => {
            if (err) return res.status(422).send({ titulo: 'Error al obtener el numero de clientes', detalles: 'Ocurrio un error al obtener el numero de clientes, por favor intentalo de nuevo mas tarde' });
            return res.status(200).json(numProductos);
        })
}

/* FUNCIONES PARA OBTENER CLIENTES ACTIVOS O INACTIVOS POR ROL DE USUARIO */
function _obtenerClientesActivosInactivosAdministradorEmpleado(activo: boolean, _idSucursal: string, res: Response) {
    Cliente.find()
        .where({
            activo,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        })
        .select(DatosActivosInactivosCliente)
        .exec((err: NativeError, clientes: ICliente[]) => {
            if (err) {
                if (activo) return res.status(422).send({ titulo: 'Error al obtener los clientes activos', detalles: 'Ocurrio un error al obtener los clientes, por favor intentalo de nuevo mas tarde' });
                else return res.status(422).send({ titulo: 'Error al obtener los clientes eliminados', detalles: 'Ocurrio un error al obtener los clientes, por favor intentalo de nuevo mas tarde' });
            }
            return res.status(200).json(clientes);
        })
}

/* FUNCIONES PARA GUARDAR UN CLIENTE POR ROL DE USUARIO */
function _guardarClienteAdministradorEmpleado(cliente: ICliente, _idSucursal: string, res: Response) {
    if (cliente.restriccionDeUsuarios) {
        cliente.usuariosHabilitados.forEach(usuario => {
            usuario.fechaRegistro = new Date(Date.now())
        })
    }
    cliente._idSucursal = _idSucursal;
    cliente._idEmpresa = res.locals.usuario._idEmpresa;
    cliente._idAccesoUsuario = res.locals.usuario._idAccesoUsuario;
    cliente._idUsuario = res.locals.usuario._id;
    cliente.default = false;
    console.log(cliente._idPais)
    cliente.listaPrecios.fechaRegistro = new Date(Date.now());
    if (cliente.omitirDireccionEnvio) cliente.direccionEnvio = null;
    if (cliente.omitirDireccionFacturacion) cliente.direccionFacturacion = null;
    cliente.save((err: any, cliente: ICliente) => {
        if (err) {
            // console.log(err);
            return res.status(422).send({ titulo: 'Error al guardar el cliente', detalles: 'Ocurrio un error al guardar el cliente, por favor intentalo de nuevo mas tarde' });
        }
        else {
            Cliente.populate(cliente,
                [
                    { path: 'direccionEnvio.idEstado' },
                    { path: 'direccionEnvio.idCiudad', select: '_id id nombre' },
                    { path: 'direccionEnvio.idCodigoPostal', select: '_id id codigo' },
                    { path: 'direccionFacturacion.idEstado' },
                    { path: 'direccionFacturacion.idCiudad', select: '_id id nombre' },
                    { path: 'direccionFacturacion.idCodigoPostal', select: '_id id codigo' },
                    { path: 'listaPrecios._idListaPrecios', model: 'ListaPrecios', select: '_id id nombre default' }
                ])
                .then((clienteCompleto) => {
                    return res.status(201).json(clienteCompleto);
                });
        }
    })
}

/* FUNCIONES PARA ACTUALIZAR UN CLIENTE POR ROL DE USUARIO */
async function _actualizarClienteAdministradorEmpleado(cliente: ICliente, _id: string, _idSucursal: string, res: Response) {
    try {
        const clienteActual: ICliente | null = await validarListaPreciosActualDelCliente(res, _id, cliente.listaPrecios._idListaPrecios);
        let seccionUpdate: any;
        if (clienteActual) {
            cliente.listaPrecios.fechaRegistro = new Date(Date.now());
            seccionUpdate = {
                $push: { historialListaPrecios: clienteActual.listaPrecios },
                $set: {
                    tipoDePersona: cliente.tipoDePersona,
                    nombre: cliente.nombre,
                    apepat: cliente.apepat,
                    apemat: cliente.apemat,
                    direccionEnvio: cliente.direccionEnvio,
                    direccionesIguales: cliente.direccionesIguales,
                    razonSocial: cliente.razonSocial,
                    rfc: cliente.rfc,
                    direccionFacturacion: cliente.direccionFacturacion,
                    listaPrecios: cliente.listaPrecios,
                    correo: cliente.correo,
                    telefonos: cliente.telefonos,
                    tieneRepresentante: cliente.tieneRepresentante,
                    nombreRepresentante: cliente.nombreRepresentante,
                    apepatRepresentante: cliente.apepatRepresentante,
                    apematRepresentante: cliente.apematRepresentante,
                    _idUsoDelCfdi: cliente._idUsoDelCfdi,
                    omitirDireccionEnvio: cliente.omitirDireccionEnvio,
                    omitirDireccionFacturacion: cliente.omitirDireccionFacturacion,
                    tieneLimiteDeCredito: cliente.tieneLimiteDeCredito,
                    cantidadLimiteDeCredito: cliente.cantidadLimiteDeCredito,
                    limitarDiasDeCredito: cliente.limitarDiasDeCredito,
                    diasLimiteDeCredito: cliente.diasLimiteDeCredito
                }
            };
        } else {
            seccionUpdate = {
                tipoDePersona: cliente.tipoDePersona,
                nombre: cliente.nombre,
                apepat: cliente.apepat,
                apemat: cliente.apemat,
                direccionEnvio: cliente.direccionEnvio,
                direccionesIguales: cliente.direccionesIguales,
                razonSocial: cliente.razonSocial,
                rfc: cliente.rfc,
                direccionFacturacion: cliente.direccionFacturacion,
                correo: cliente.correo,
                telefonos: cliente.telefonos,
                tieneRepresentante: cliente.tieneRepresentante,
                nombreRepresentante: cliente.nombreRepresentante,
                apepatRepresentante: cliente.apepatRepresentante,
                apematRepresentante: cliente.apematRepresentante,
                _idUsoDelCfdi: cliente._idUsoDelCfdi,
                omitirDireccionEnvio: cliente.omitirDireccionEnvio,
                omitirDireccionFacturacion: cliente.omitirDireccionFacturacion,
                tieneLimiteDeCredito: cliente.tieneLimiteDeCredito,
                cantidadLimiteDeCredito: cliente.cantidadLimiteDeCredito,
                limitarDiasDeCredito: cliente.limitarDiasDeCredito,
                diasLimiteDeCredito: cliente.diasLimiteDeCredito
            }
        }
        Cliente.findOneAndUpdate(
            {
                _id,
                _idEmpresa: res.locals.usuario._idEmpresa,
                _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
                $or: [
                    { default: false },
                    { default: null },
                    { default: true, _idSucursal }
                ]
            },
            seccionUpdate, { new: true, fields: DatosCliente })
            .populate('direccionEnvio.idEstado')
            .populate({ path: 'direccionEnvio.idCiudad', select: '_id id nombre' })
            .populate({ path: 'direccionEnvio.idCodigoPostal', select: '_id id codigo' })
            .populate('direccionFacturacion.idEstado')
            .populate({ path: 'direccionFacturacion.idCiudad', select: '_id id nombre' })
            .populate({ path: 'direccionFacturacion.idCodigoPostal', select: '_id id codigo' })
            .populate({ path: 'listaPrecios._idListaPrecios', model: 'ListaPrecios', select: '_id id nombre default' })
            .exec((err: NativeError, clienteActualizado: ICliente | null) => {
                if (err) return res.status(422).send({ titulo: 'Error al actualizar la informacion del cliente', detalles: 'Ocurrio un error al actualizar la informacion del cliente, por favor intentalo de nuevo mas tarde' });
                if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar la informacion del cliente', detalles: 'Ocurrio un error al actualizar la informacion del cliente, posiblemente no exista' });
                else return res.status(200).json(clienteActualizado);
            })
    } catch (error: any) {
        return res.status(error.codigo).send({ titulo: error.titulo, detalles: error.detalles })
    }
}

/* FUNCIONES PARA ACTUALIZAR LA INFORMACION GENERAL DE UN CLIENTE POR ROL DE USUARIO */
function _actualizarInfoGeneralClienteAdministradorEmpleado(cliente: ICliente, _id: string, _idSucursal: string, res: Response) {
    Cliente.findOneAndUpdate(
        {
            _id,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        },
        {
            nombre: cliente.nombre,
            apepat: cliente.apepat,
            apemat: cliente.apemat,
            razonSocial: cliente.razonSocial
        }, { new: true, fields: DatosInfoGeneralCliente })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar la informacion general del cliente', detalles: 'Ocurrio un error al actualizar la informacion general del cliente, por favor intentalo de nuevo mas tarde' });
            if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar la informacion general del cliente', detalles: 'Ocurrio un error al actualizar la informacion general del cliente, posiblemente no exista' });
            else return res.status(200).json(clienteActualizado);
        })
}

/* FUNCIONES PARA ACTUALIZAR LA DIRECCION DE ENVIO DE UN CLIENTE POR ROL DE USUARIO */
function _actualizarDireccionEnvioClienteAdministradorEmpleado(_id: string, _idSucursal: string, datosActualizar: any, res: Response) {
    Cliente.findOneAndUpdate(
        {
            _id,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        },
        datosActualizar,
        { new: true, fields: DatosDireccionEnvioCliente })
        .populate('direccionEnvio.idEstado')
        .populate({ path: 'direccionEnvio.idCiudad', select: '_id id nombre' })
        .populate({ path: 'direccionEnvio.idCodigoPostal', select: '_id id codigo' })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar la direccion de envio del cliente', detalles: 'Ocurrio un error al actualizar la direccion de envio del cliente, por favor intentalo de nuevo mas tarde' });
            if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar la direccion de envio del cliente', detalles: 'Ocurrio un error al actualizar la direccion de envio del cliente, posiblemente no exista' });
            else return res.status(200).json(clienteActualizado);
        })
}

/* FUNCIONES PARA ACTUALIZAR LOS DATOS FISCALES DE UN CLIENTE POR ROL DE USUARIO */
function _actualizarDatosFiscalesClienteAdministradorEmpleado(cliente: ICliente, _id: string, _idSucursal: string, res: Response) {
    Cliente.findOneAndUpdate(
        {
            _id,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        },
        {
            rfc: cliente.rfc,
            direccionesIguales: cliente.direccionesIguales,
            direccionFacturacion: cliente.direccionFacturacion,
            omitirDireccionFacturacion: cliente.omitirDireccionFacturacion,
            _idUsoDelCfdi: cliente._idUsoDelCfdi,
            ciudad: cliente.ciudad,
            estado: cliente.estado,
            _idPais: cliente._idPais
        }, { new: true, fields: DatosDatosFiscalesCliente })
        .populate('direccionFacturacion.idEstado')
        .populate({ path: 'direccionFacturacion.idCiudad', select: '_id id nombre' })
        .populate({ path: 'direccionFacturacion.idCodigoPostal', select: '_id id codigo' })
        .populate({ path: '_idPais', model: Pais })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar los datos fiscales del cliente', detalles: 'Ocurrio un error al actualizar los datos fiscales del cliente, por favor intentalo de nuevo mas tarde' });
            if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar los datos fiscales del cliente', detalles: 'Ocurrio un error al actualizar los datos fiscales del cliente, posiblemente no exista' });
            else res.status(200).json(clienteActualizado);
        })
}

/* FUNCIONES PARA ACTUALIZAR LA INFORMACION DE CONTACTO DE UN CLIENTE POR ROL DE USUARIO */
function _actualizarInfoContactoClienteAdministradorEmpleado(cliente: ICliente, _id: string, _idSucursal: string, res: Response) {
    Cliente.findOneAndUpdate(
        {
            _id,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        },
        {
            correo: cliente.correo,
            telefonos: cliente.telefonos,
            tieneRepresentante: cliente.tieneRepresentante,
            nombreRepresentante: cliente.nombreRepresentante,
            apepatRepresentante: cliente.apepatRepresentante,
            apematRepresentante: cliente.apematRepresentante
        }, { new: true, fields: DatosInfoContactoCliente })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar la informacion de contacto del cliente', detalles: 'Ocurrio un error al actualizar la informacion de contacto del cliente, por favor intentalo de nuevo mas tarde' });
            if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar la informacion de contacto del cliente', detalles: 'Ocurrio un error al actualizar la informacion de contacto del cliente, posiblemente no exista' });
            else return res.status(200).send(clienteActualizado);
        })
}

/* FUNCIONES PARA ACTUALIZAR LA LISTA DE PRECIOS DE UN CLIENTE POR ROL DE USUARIO */
async function _actualizarListaPreciosClienteAdministradorEmpleado(cliente: ICliente, _id: string, _idSucursal: string, res: Response) {
    try {
        const clienteActual: ICliente | null = await validarListaPreciosActualDelCliente(res, _id, cliente.listaPrecios._idListaPrecios);
        if (clienteActual) {
            cliente.listaPrecios.fechaRegistro = new Date(Date.now());
            Cliente.findOneAndUpdate(
                {
                    _id,
                    _idEmpresa: res.locals.usuario._idEmpresa,
                    _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
                    $or: [
                        { default: false },
                        { default: null },
                        { default: true, _idSucursal }
                    ]
                },
                {
                    $push: { historialListaPrecios: clienteActual.listaPrecios },
                    $set: { listaPrecios: cliente.listaPrecios }
                },
                { new: true, fields: DatosListaPreciosCliente })
                .populate({ path: 'listaPrecios._idListaPrecios', model: 'ListaPrecios', select: '_id id nombre default' })
                .exec((err: NativeError, clienteActualizado: ICliente | null) => {
                    if (err) return res.status(422).send({ titulo: 'Error al actualizar el cliente', detalles: 'Ocurrio un error al actualizar la informacion del cliente, por favor intentalo de nuevo mas tarde' });
                    if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar el cliente', detalles: 'Ocurrio un error al actualizar la informacion del cliente, posiblemente no exista' });
                    else return res.status(200).json(clienteActualizado);
                })
        } else {
            return res.status(400).send({ titulo: 'Error al actualizar la lista de precios del cliente', detalles: 'La lista de precios enviada es la misma a la lista de precios actual, prueba con una lista de precios diferente.' });
        }
    } catch (error: any) {
        return res.status(error.codigo).send({ titulo: error.titulo, detalles: error.detalles })
    }
}

function _actualizarLimiteDeCreditoAdministradorEmpleado(cliente: ICliente, _id: string, _idSucursal: string, res: Response) {
    Cliente.findOneAndUpdate(
        {
            _id,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        },
        {
            $set: {
                tieneLimiteDeCredito: cliente.tieneLimiteDeCredito,
                cantidadLimiteDeCredito: cliente.cantidadLimiteDeCredito,
                limitarDiasDeCredito: cliente.limitarDiasDeCredito,
                diasLimiteDeCredito: cliente.diasLimiteDeCredito,
            }
        },
        { new: true, fields: DatosLimiteDeCreditoCliente })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar el cliente', detalles: 'Ocurrio un error al actualizar la informacion del cliente, por favor intentalo de nuevo mas tarde' });
            if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar el cliente', detalles: 'Ocurrio un error al actualizar la informacion del cliente, posiblemente no exista' });
            else return res.status(200).json(clienteActualizado);
        })
}

/* FUNCIONES PARA ACTUALIZAR LA FOTOGRAFIA DE UN CLIENTE POR ROL DE USUARIO */
function _actualizarFotografiaClienteAdministradorEmpleado(datosActualizar: { rutaFoto: string, nombreFoto: string }, _id: string, _idSucursal: string, res: Response) {
    Cliente.findOneAndUpdate(
        {
            _id,
            _idEmpresa: res.locals.usuario._idEmpresa,
            _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
            $or: [
                { default: false },
                { default: null },
                { default: true, _idSucursal }
            ]
        },
        {
            rutaFoto: datosActualizar.rutaFoto,
            nombreFoto: datosActualizar.nombreFoto
        }, { new: true, fields: DatosFotografiaCliente })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar la fotografia del cliente', detalles: 'Ocurrio un error al actualizar la fotografia del cliente, por favor intentalo de nuevo mas tarde' });
            if (clienteActualizado) return res.status(200).json(clienteActualizado);
            else return res.status(404).send({ titulo: 'Error al actualizar la fotografia del cliente', detalles: 'No se pudo actualizar la fotografia del cliente, posiblemente no exista.' });
        })
}

function _actualizarRestriccionDeUsuariosClienteAdministradorEmpleado(_id: string, cliente: ICliente, _idSucursal: string, res: Response) {
    let elementoHistorial = {
        _idUsuario: res.locals.usuario._id,
        restriccionDeUsuarios: cliente.restriccionDeUsuarios,
        usuariosHabilitados: cliente.usuariosHabilitados,
        fechaRegistro: new Date(Date.now())
    }
    Cliente.findOneAndUpdate({
        _id,
        _idEmpresa: res.locals.usuario._idEmpresa,
        _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
        $or: [
            { default: false },
            { default: null },
            { default: true, _idSucursal }
        ]
    },
        {
            $set: {
                restriccionDeUsuarios: cliente.restriccionDeUsuarios,
                usuariosHabilitados: cliente.usuariosHabilitados
            },
            $push: {
                historialDeRestriccionDeUsuarios: elementoHistorial
            }
        })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar la información del cliente', detalles: 'Ocurrio un error al actualizar la información del cliente, por favor intentalo de nuevo mas tarde' });
            if (clienteActualizado) return res.status(200).json(clienteActualizado);
            else return res.status(404).send({ titulo: 'Error al actualizar la información del cliente', detalles: 'No se pudo actualizar la información del cliente, posiblemente no exista.' });
        })
}

/* FUNCIONES PARA CAMBIAR ESTADO DE UN CLIENTE POR ROL DE USUARIO */
function _cambiarEstadoClienteAdministradorEmpleado(_id: string, _idSucursal: string, activo: boolean, res: Response) {
    Cliente.findOneAndUpdate({
        _id,
        _idEmpresa: res.locals.usuario._idEmpresa,
        _idAccesoUsuario: res.locals.usuario._idAccesoUsuario,
        $or: [
            { default: false },
            { default: null },
            { default: true, _idSucursal }
        ]
    }, { activo })
        .exec((err: NativeError, clienteActualizado: ICliente | null) => {
            if (err) return res.status(422).send({ titulo: 'Error al actualizar el estado del cliente', detalles: 'Ocurrio un error al actualizar el estado del cliente, por favor intentalo de nuevo mas tarde' });
            if (!clienteActualizado) return res.status(404).send({ titulo: 'Error al actualizar el estado del cliente', detalles: 'Ocurrio un error al actualizar el estado del cliente, posiblemente no exista' });
            else {
                if (activo) return res.status(200).send({ titulo: 'Cliente activado', detalles: 'El cliente ha sido activado exitosamente' });
                else return res.status(200).send({ titulo: 'Cliente eliminado', detalles: 'El cliente ha sido eliminado exitosamente' });
            }
        })
}

/* FUNCIONES AUXILIARES */
function validarCamposCliente(cliente: ICliente, importacion: boolean): { error: boolean, titulo: string, detalles: string } {
    const resp = validarCamposClienteInfoGeneral(cliente);
    if (resp.error) return { error: true, titulo: resp.titulo, detalles: resp.detalles };
    const resp2 = validarCamposClienteDireccionEnvio(cliente.direccionEnvio, importacion);
    if (resp2.error) return { error: true, titulo: resp2.titulo, detalles: resp2.detalles };
    const resp3 = validarCamposClienteDatosFiscales(cliente, importacion);
    if (resp3.error) return { error: true, titulo: resp3.titulo, detalles: resp3.detalles };
    const resp4 = validarCamposClienteListaPrecios(cliente);
    if (resp4.error) return { error: true, titulo: resp4.titulo, detalles: resp4.detalles };
    const resp5 = validarCamposClienteContacto(cliente);
    if (resp5.error) return { error: true, titulo: resp5.titulo, detalles: resp5.detalles };
    const resp6 = validarCamposClienteRestriccionDeUsuarios(cliente);
    if (resp6.error) return { error: true, titulo: resp6.titulo, detalles: resp6.detalles };
    return { error: false, titulo: '', detalles: '' };
}
function validarCamposClienteInfoGeneral(cliente: ICliente): { error: boolean, titulo: string, detalles: string } {
    if (!cliente.tipoDePersona) return { error: true, titulo: 'Campo tipo de persona requerido', detalles: 'Por favor, ingresa el campo tipo de persona' };
    if (!Object.values(TiposDePersona).includes(cliente.tipoDePersona)) return { error: true, titulo: 'Campo tipo de persona invalido', detalles: 'Por favor, ingresa el un valor valido para el campo tipo de persona' };
    return { error: false, titulo: '', detalles: '' };
}
function validarCamposClienteDireccionEnvio(direccionEnvio: any, importacion: boolean): { error: boolean, titulo: string, detalles: string } {
    if (direccionEnvio && !importacion) {
        const resp = verificarDireccion(direccionEnvio);
        if (resp.error) return { error: resp.error, titulo: resp.titulo, detalles: resp.detalles };
    } else direccionEnvio = null;
    return { error: false, titulo: '', detalles: '' };
}
function validarCamposClienteDatosFiscales(cliente: ICliente, importacion: boolean): { error: boolean, titulo: string, detalles: string } {
    if (!cliente.rfc) return { error: true, titulo: 'Campo rfc requerido', detalles: 'Por favor, ingresa el campo rfc' };
    if (!cliente._idUsoDelCfdi) return { error: true, titulo: 'Campo uso del CFDI requerido', detalles: 'Por favor, ingresa el campo uso del CFDI' };
    if (cliente.tipoDePersona != TiposDePersona.Ninguna) {
        if (cliente.direccionFacturacion && !importacion) {
            if (cliente.tipo == TipoDeCliente.Nacional) {
                const resp = verificarDireccion(cliente.direccionFacturacion);
                if (resp.error) return { error: resp.error, titulo: resp.titulo, detalles: resp.detalles };
            }
        }
    }
    return { error: false, titulo: '', detalles: '' };
}
function validarCamposClienteListaPrecios(cliente: ICliente): { error: boolean, titulo: string, detalles: string } {
    if (!cliente.listaPrecios._idListaPrecios) return { error: true, titulo: 'Campo lista de precios requerido', detalles: 'Por favor, ingresa el campo lista de precios' };
    return { error: false, titulo: '', detalles: '' };
}
function validarCamposClienteContacto(cliente: ICliente): { error: boolean, titulo: string, detalles: string } {
    if (cliente.telefonos.length > 2) return { error: true, titulo: 'Numero de telefonos excedido', detalles: 'Solo se permiten dos telefonos' };
    const resp = verificarTelefonos(cliente.telefonos);
    if (resp.error) return { error: true, titulo: resp.titulo, detalles: resp.detalles }
    if (cliente.tipoDePersona == TiposDePersona.Moral) {
        if (cliente.tieneRepresentante == null) return { error: true, titulo: 'Campo tiene representante requerido', detalles: 'Por favor, ingresa el campo tiene representante' };
        if (cliente.tieneRepresentante && !cliente.nombreRepresentante) return { error: true, titulo: 'Campo nombre de representante requerido', detalles: 'Por favor, ingresa el campo nombre de representante' };
        if (cliente.tieneRepresentante && !cliente.apepatRepresentante) return { error: true, titulo: 'Campo apellido paterno de representante requerido', detalles: 'Por favor, ingresa el campo apellido paterno de representante' };
    }
    return { error: false, titulo: '', detalles: '' };
}

function validarCamposClienteRestriccionDeUsuarios(cliente: ICliente): { error: boolean, titulo: string, detalles: string } {
    if (cliente.restriccionDeUsuarios) {
        if (cliente.usuariosHabilitados.length <= 0) return { error: true, titulo: 'Campo usuarios permitidos requerido', detalles: 'Por favor, ingresa al menos un usuario permitido en la restricción de usuarios' };
    }
    return { error: false, titulo: '', detalles: '' };
}

/* FUNCIONES PARA VALIDACIONES */
async function validarListaPreciosActualDelCliente(res: Response, _id: string, _idListaPrecios: string) {
    return new Promise<ICliente | null>((resolve, reject) => {
        Cliente.findOne()
            .where({ _id, _idAccesoUsuario: res.locals.usuario._idAccesoUsuario })
            .select(DatosListaPreciosCliente)
            .exec((err: NativeError, cliente: ICliente | null) => {
                if (err) reject({ titulo: 'Error al actualizar la lista de precios del cliente', detalles: 'Ocurrio un error al actualizar la lista de precios del cliente, por favor intentalo de nuevo mas tarde', codigo: 422 });
                else {
                    if (cliente) {
                        if (String(cliente.listaPrecios._idListaPrecios) != String(_idListaPrecios)) resolve(cliente);
                        else resolve(null);
                    } else reject({ titulo: 'Error al actualizar la lista de precios del cliente', detalles: 'Ocurrio un error al actualizar la lista de precios del cliente, posiblemente no exista', codigo: 404 });
                }
            })
    });
}
async function validarClientePorRFC(rfc: string, _idEmpresa: string, _idAccesoUsuario: string, _idExcluido?: string): Promise<ICliente | null> {
    return new Promise<ICliente | null>((resolve) => {
        if (rfc == RFC_GENERICO) resolve(null);
        else {
            let seccionBuscar = {};
            if (_idExcluido) {
                seccionBuscar = { _id: { $ne: _idExcluido }, rfc, _idEmpresa, _idAccesoUsuario };
            } else {
                seccionBuscar = { rfc, _idEmpresa, _idAccesoUsuario };
            }
            Cliente.findOne()
                .where(seccionBuscar)
                .exec((err: NativeError, cliente: ICliente | null) => {
                    resolve(cliente)
                })
        }
    });
}
async function validarClientePorRFCKiosco(rfc: string): Promise<ICliente | null> {
    return new Promise<ICliente | null>((resolve) => {
        if (rfc == RFC_GENERICO) resolve(null);
        else {
            let seccionBuscar = {};
            seccionBuscar = { rfc };
            Cliente.findOne()
                .where(seccionBuscar)
                .exec((err: NativeError, cliente: ICliente | null) => {
                    resolve(cliente)
                })
        }
    });
}
