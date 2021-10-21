import crypto from 'crypto';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { NativeError } from 'mongoose';
import nodemailer from 'nodemailer';
import { SECRETA } from '../../../config/globales';
import { IUsuario, Usuario } from '../modelos/usuario.model';
import * as Socket from '../../sockets/sockets';
import { IBitacoraSesion, BitacoraSesion } from '../modelos/bitacionSesion.model';
import {EMAIL_CORREOS} from "../../constantes/email-correos.constant";
import {TiposUsuario} from "../../enumeraciones/tipos-usuarios.enum";

/* CONSTANTES */
const ExpiracionDelToken = '8h';
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: EMAIL_CORREOS
})

/* GET */

/* POST */
export let iniciarSesionUsuario = async (req: Request, res: Response) => {
    const { correoUsuario, contrasena } = req.body;
    if (!correoUsuario || !contrasena) return res.status(400).send({ titulo: 'Campos incorrectos', detalles: 'Ambos campos son requeridos para iniciar sesión' });
    try {
        let datosDelToken: any;
        //Se busca al usuario que desea inicar sesión
        const usuarioEncontrado: IUsuario = await obtenerUsuario(correoUsuario, 'Correo electrónico o contraseña incorrectos');
        //Se hacen las verificaciones globales
        await verificarContrasena(usuarioEncontrado, contrasena);
        //Se hacen las verificaciones correspondientes para cada tipo de usuario
        switch (usuarioEncontrado.tipo) {
            case TiposUsuario.Root:
                datosDelToken = {
                    _id: usuarioEncontrado._id, id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, tipo: usuarioEncontrado.tipo,
                    nombre: usuarioEncontrado.nombre, apepat: usuarioEncontrado.apepat, apemat: usuarioEncontrado.apemat,
                    //personalizacion: usuarioEncontrado.personalizacion
                };
                break;
            case TiposUsuario.Administrador:
                await inicializarDatosUsuario(usuarioEncontrado._id, [TiposUsuario.Administrador]);
                datosDelToken = {
                    _id: usuarioEncontrado._id, id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, tipo: usuarioEncontrado.tipo,
                    nombre: usuarioEncontrado.nombre, apepat: usuarioEncontrado.apepat, apemat: usuarioEncontrado.apemat, correo: usuarioEncontrado.correo,
                    rutaFoto: usuarioEncontrado.rutaFoto, tipoDePersona: usuarioEncontrado.tipoDePersona, rfc: usuarioEncontrado.rfc,
                    /*personalizacion: usuarioEncontrado.personalizacion,*/
                    _idAccesoUsuario: usuarioEncontrado._idAccesoUsuario, _idUsuario: usuarioEncontrado._idUsuario
                }
                break;
            case TiposUsuario.Empleado:
                await verificarHorario(usuarioEncontrado);
                await verificarAccesoUsuario(usuarioEncontrado._idAccesoUsuario);
                await inicializarDatosUsuario(usuarioEncontrado._id, [TiposUsuario.Empleado]);
                datosDelToken = {
                    _id: usuarioEncontrado._id, id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, tipo: usuarioEncontrado.tipo,
                    nombre: usuarioEncontrado.nombre, apepat: usuarioEncontrado.apepat, apemat: usuarioEncontrado.apemat, correo: usuarioEncontrado.correo,
                    rutaFoto: usuarioEncontrado.rutaFoto, tipoDePersona: usuarioEncontrado.tipoDePersona, rfc: usuarioEncontrado.rfc,
                   /* personalizacion: usuarioEncontrado.personalizacion,*/ _idAccesoUsuario: usuarioEncontrado._idAccesoUsuario,
                    _idUsuario: usuarioEncontrado._idUsuario,
                }
                break;
        }
        const token: any = obtenerToken(datosDelToken);
        await guardarBitacora(usuarioEncontrado._id);
        return res.status(200).json(token);
    } catch (error: any) {
        return res.status(error.codigo).send({ titulo: error.titulo, detalles: error.detalles });
    }
}

/* PUT */

/* PATCH */

export let cerrarSesionUsuario = async (req: Request, res: Response) => {
    const _idUsuario: string = res.locals.usuario._id;
    try {
        switch (res.locals.usuario.tipo) {
            case TiposUsuario.Root:
                await inicializarDatosUsuario(_idUsuario, [TiposUsuario.Root]);
                break;
            case TiposUsuario.Administrador:
                await inicializarDatosUsuario(_idUsuario, [TiposUsuario.Administrador]);
                break;
            case TiposUsuario.Empleado:
                await inicializarDatosUsuario(_idUsuario, [TiposUsuario.Empleado]);
                break;
        }
        return res.status(200).json({ titulo: 'Sesión cerrada', detalles: 'La sesión se ha cerrado con éxito' });
    } catch (error: any) {
        return res.status(error.codigo).send({ titulo: error.titulo, detalles: error.detalles });
    }
}
export let crearCodigoRecuperacion = async (req: Request, res: Response) => {
    const codigoRecuperacion = obtenerCodigoRecuperacion();
    const usuario = req.body.usuario;
    try {
        const usuarioEncontrado: IUsuario = await obtenerUsuario(usuario, 'No existe un usuario con este nombre de usuario');
        await actualizarCodigoRecuperacionUsuario(usuarioEncontrado._id, codigoRecuperacion);
        await enviarCorreoElectronico(EMAIL_CORREOS.user, usuarioEncontrado.correo, 'Recuperación de contraseña', `El código de recuperación es ${codigoRecuperacion}`, crearHtmlCodigoDeRecuperacionUsuario(usuarioEncontrado.usuario, codigoRecuperacion))
        return res.status(200).send({ titulo: 'Correo enviado', detalles: 'Se ha enviado un correo con el código de recuperación para actualizar tu contrasena' });
    } catch (error: any) {
        return res.status(error.codigo).send({ titulo: error.titulo, detalles: error.detalles });
    }
}
export let recuperarContrasena = async (req: Request, res: Response) => {
    const { usuario, codigo, contrasena, confirmarContrasena } = req.body;
    try {
        const usuarioEncontrado: IUsuario = await obtenerUsuario(usuario, 'No existe un usuario con este nombre de usuario');
        if (codigo !== usuarioEncontrado.codigoRecuperacion) return res.status(400).send({ titulo: 'Código de recuperación inválido', detalles: 'El código de recuperación ingresado no coincide con el enviado' });
        else {
            if (existeContrasenaEnArray(usuarioEncontrado, contrasena)) return res.status(409).send({ titulo: 'Contraseña invalida', detalles: 'Ya has usado esta contraseña previamente, por favor escribe otra' });
            else {
                const contrasenas = agregarNuevaContrasena(usuarioEncontrado, contrasena);
                Usuario.findByIdAndUpdate(usuarioEncontrado._id, {
                    contrasenas,
                    codigoRecuperacion: ''
                }).exec((err: NativeError, usuarioActualizado: IUsuario | null) => {
                    if (err) return res.status(422).send({ titulo: 'Ha ocurrio un error al actualizar tu contraseña', detalles: 'Ha ocurrido un error al actualizar tu contraseña, favor de intentarlo mas tarde' });
                    return res.status(200).json({ titulo: 'Contraseña actualizada', detalles: 'Se actualizó satisfactoriamente la contraseña' })
                })
            }
        }
    } catch (error: any) {
        return res.status(error.codigo).send({ titulo: error.titulo, detalles: error.detalles });
    }
}

/* FUNCIONES AUXILIARES */
function buscarContrasenaActual(usuario: IUsuario): string {
    const datosDeContrasena = usuario.contrasenas.find(contrasena => contrasena.activo);
    return datosDeContrasena !== undefined ? datosDeContrasena.contrasena : '';
}
function obtenerToken(datosDelToken: any): any {
    return jwt.sign(datosDelToken, SECRETA, { expiresIn: ExpiracionDelToken });
}
function buscarHorario(diaActual: number, horarios: any[]): { existe: boolean, horaInicio: string, horaFin: string } {
    for (const horario of horarios) {
        if (horario.dia == diaActual) return { existe: true, horaInicio: horario.horaInicio, horaFin: horario.horaFin };
    }
    return { existe: false, horaInicio: '', horaFin: '' };
}
function obtenerCodigoRecuperacion(): string {
    const tamCodigo: number = 10;
    const caracteres: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigoRecuperacion = '';
    for (let i = 0; i < tamCodigo; i++) {
        codigoRecuperacion += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigoRecuperacion;
}
function crearHtmlCodigoDeRecuperacionUsuario(usuario: string, codigoDeRecuperacion: string): string {
    return `
    <body style="width: 600px; margin: 0 auto;">
        <table style="width: 100%;">
            <th colspan="3">
            <div style="background-color: #f3be38; width: 246px; height: 13px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; margin-left: 29%;"></div>
            </th>
            <tbody>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;">
                    <td colspan="3" style="padding-left: 5%; padding-right: 5%;  padding-top: 20px;">
                        <img src="https://login.softweb.mx/recursos/logo.png" alt="softweb.mx" width="200px">
                    </td>
                </tr>
                <tr style="text-align: center;">
                    <td colspan="3" style="padding-top: 10px;">
                        <div style="width: 397px; height: 2pt; background-color: black; opacity: 0.2; margin-left: 17%;"></div>
                    </td>
                </tr>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;">
                    <td colspan="3" style="padding-left: 8%; padding-right: 8%; padding-top: 15px;">
                        <span style="color: #222f41; font-size: 30pt; font-weight: 700; font-family: Montserrat, Semi-bold, sans-serif;">Usuario: ${usuario}</span>
                    </td>
                </tr>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;">
                    <td colspan="3" style="padding-left: 8%; padding-right: 8%; padding-top: 15px;">
                        <span style="color: #222f41; font-size: 30pt; font-weight: 700; font-family: Montserrat, Semi-bold, sans-serif;">Código: ${codigoDeRecuperacion}</span>
                    </td>
                </tr>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;  margin-top: 10%;">
                    <td colspan="3" style="padding-left: 10%; padding-right: 10%; padding-top: 20px;">
                        <span style="color: #0b77a8; font-size: 21pt; font-family: 'Montserrat', sans-serif;">
                            ¡Ahora ingresa el código de recuperación en <span style="font-weight: bold;">login.softweb.mx</span>!
                        </span>
                    </td>
                </tr>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;">
                    <td colspan="3" style="padding-left: 15%; padding-right: 15%; padding-top: 15px;">
                        <span style="color: #222f41; font-size: 30pt; font-family: 'Arona', sans-serif; font-weight: bold; letter-spacing: 3px;">Softweb<span style="color: #379bd2">.mx</span></span>
                    </td>
                </tr>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;">
                    <td colspan="3" style="padding-left: 10%; padding-right: 10%; padding-top: 15px;">
                        <span style="color: #222f41; font-size: 21pt; font-family: Montserrat, Regular, sans-serif;">¡Si tienes algún problema con tu cuenta, no dudes en contactarnos, estamos para servirte!</span>
                        <br><br>
                        <span style="color: #222f41; font-size: 18pt; font-family: Montserrat, Regular, sans-serif; font-weight: bold;">Recuerda: <br><span style="font-family: Montserrat, Semi-bold, sans-serif; font-weight: bold; font-size: 12pt; color: #e21a1a;"> Puedes cambiar tu usuario y contraseña en cualquier momento</span></span>
                    </td>
                </tr>
                <tr style="text-align: center;">
                    <td colspan="3" style="padding-top: 25px;">
                        <div style="width: 113px; height: 2.5pt; background-color: rgb(22, 204, 22); opacity: 0.7; margin-left: 41%;"></div>
                    </td>
                </tr>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;">
                    <td colspan="3" style="padding-left: 10%; padding-right: 10%; padding-top: 10px;">
                        <span style="color: #379bd2; font-size: 20pt; font-family: 'Raleway', sans-serif;">softweb.tecnologias@gmail.com</span>
                    </td>
                </tr>
                <tr style="text-align: center; padding-top: 2.5%; padding-bottom: 2.5%;">
                    <td colspan="3" style="padding-left: 10%; padding-right: 10%; padding-top: 10px;">
                        <div style="background-color: #f3be38; width: 246px; height: 13px; border-top-right-radius: 10px; border-top-left-radius: 10px; margin-left: 25%;"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>`;
}
function encriptarContrasena(contrasena: string): string {
    return crypto.createHash('sha256').update(contrasena).digest('hex');
}
function existeContrasenaEnArray(usuario: IUsuario, contrasena: string): boolean {
    const contrasenaEncriptada = encriptarContrasena(contrasena);
    const contrasenaEncontrada = usuario.contrasenas.find(contrasena => contrasena.contrasena == contrasenaEncriptada);
    return contrasenaEncontrada == undefined ? false : true;
}
function agregarNuevaContrasena(usuario: IUsuario, contrasena: string): any[] {
    const contrasenaEncriptada = encriptarContrasena(contrasena);
    usuario.contrasenas = usuario.contrasenas.map(contrasena => {
        contrasena.activo = false;
        return contrasena;
    })
    usuario.contrasenas.push({
        correo: usuario.correo,
        contrasena: contrasenaEncriptada,
        fechaRegistro: new Date(Date.now()),
        _idUsuario: usuario._id,
        activo: true
    })
    return usuario.contrasenas;
}

/* FUNCIONES PARA VALIDACIONES */
function obtenerUsuario(usuario: string, detallesUsuarioNoEncontrado: string): Promise<IUsuario> {
    return new Promise<IUsuario>((resolve, reject) => {
        Usuario.findOne({ usuario, activo: true })
            .exec((err: NativeError, usuarioEncontrado: IUsuario | null) => {
                if (err) reject({ codigo: 422, titulo: 'Ocurrió un error al verificar el usuario', detalles: 'Ha ocurrido un error al verificar el usuario, favor de intentarlo mas tarde' });
                else {
                    if (usuarioEncontrado) resolve(usuarioEncontrado);
                    else reject({ codigo: 404, titulo: 'Datos incorrectos', detalles: detallesUsuarioNoEncontrado });
                }
            })
    })
}
async function verificarContrasena(usuario: IUsuario, contrasena: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const contrasenaActual: string = buscarContrasenaActual(usuario);
        const contrasenaEncriptada: string = crypto.createHash('sha256').update(contrasena).digest('hex');
        console.log(contrasenaEncriptada, contrasenaActual)
        if (contrasenaEncriptada == contrasenaActual) resolve();
        else reject({ codigo: 422, titulo: 'Datos incorrectos', detalles: 'Correo electrónico o contraseña incorrectos' });
    })
}
async function guardarBitacora(_idUsuario: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const bitacoraSesion: IBitacoraSesion = new BitacoraSesion();
        bitacoraSesion._idUsuario = _idUsuario;
        // @ts-ignore
        bitacoraSesion.save((err: NativeError, bitacoraSesionGuardada: IBitacoraSesion) => {
            if (err) reject({ codigo: 422, titulo: 'Ocurrió un error al iniciar sesión', detalles: 'Ha ocurrido un error al iniciar sesión, favor de intentarlo mas tarde' });
            else resolve();
        });
    })
}
async function inicializarDatosUsuario(_idUsuario: string, tiposUsuarioValidos: number[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        Usuario.findOneAndUpdate(
            { _id: _idUsuario, tipo: { $in: tiposUsuarioValidos } }
        )
            .exec((err: NativeError, usuario: IUsuario | null) => {
                if (err) reject({ codigo: 422, titulo: 'Ocurrió un error al inicializar los datos del usuario', detalles: 'Ha ocurrido un error al inicializar los datos del usuario, favor de intentarlo mas tarde' });
                else {
                    if (usuario) resolve()
                    else reject({ codigo: 422, titulo: 'Ocurrió un error al inicializar los datos del usuario', detalles: 'Ha ocurrido un error al inicializar los datos del usuario, posiblemente no exista' });
                }
            })
    })
}
async function verificarHorario(usuario: IUsuario): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (usuario.tieneHorario) {
            const horarioEncontrado = buscarHorario(new Date(Date.now()).getDay(), usuario.horario);
            if (horarioEncontrado.existe) {
                const horaReal = new Date(Date.now());
                let horaInicio = moment({ h: Number(horarioEncontrado.horaInicio.split(':')[0]), m: Number(horarioEncontrado.horaInicio.split(':')[1]) })
                let horaFin = moment({ h: Number(horarioEncontrado.horaFin.split(':')[0]), m: Number(horarioEncontrado.horaFin.split(':')[1]) })
                let horaInicioReal = moment({ h: horaReal.getHours(), m: horaReal.getMinutes() });
                if (horaInicioReal.isAfter(horaInicio) && horaInicioReal.isBefore(horaFin)) {
                    resolve();
                } else {
                    reject({ codigo: 403, titulo: 'Tu cuenta tiene restriccion de horario', detalles: 'Esta cuenta solo puede ser utilizada de ' + horarioEncontrado.horaInicio + ' a ' + horarioEncontrado.horaFin });
                }
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    })
}
async function verificarAccesoUsuario(_idAccesoUsuario: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        Usuario.findOne({ _id: _idAccesoUsuario, activo: true })
            .exec((err: NativeError, usuario: IUsuario | null) => {
                if (err) reject({ codigo: 422, titulo: 'Ocurrió un error al verificar la cuenta', detalles: 'Ha ocurrido un error al verificar la cuenta, favor de intentarlo mas tarde' });
                else {
                    if (usuario) resolve();
                    else reject({ codigo: 404, titulo: 'Ocurrió un error al verificar la cuenta', detalles: 'Ha ocurrido un error al verificar la cuenta, posiblemente no exista' });
                }
            })
    })
}
async function actualizarCodigoRecuperacionUsuario(_idUsuario: string, codigoRecuperacion: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        Usuario.findOneAndUpdate({ _id: _idUsuario }, {
            codigoRecuperacion
        }).exec((err: NativeError, usuario: IUsuario | null) => {
            if (err) reject({ codigo: 422, titulo: 'Ocurrió un error al enviar el código de recuperación', detalles: 'Ha ocurrido un error al enviar el código de recuperación, favor de intentarlo mas tarde' });
            else {
                if (usuario) resolve();
                else reject({ codigo: 404, titulo: 'Ocurrió un error al enviar el código de recuperación', detalles: 'Ha ocurrido un error al enviar el código de recuperación, posiblemente no exista el usuario' });
            }
        })
    })
}
async function enviarCorreoElectronico(de: string, para: string, asunto: string, cuerpo: string, html?: any, archivosAdjuntos?: any[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let opcionesCorreo = {
            from: de,
            to: para,
            subject: asunto,
            text: cuerpo,
            html: html,
            attachments: archivosAdjuntos
        };
        transporter.sendMail(opcionesCorreo, (error: Error | null, info: any) => {
            if (error) reject({ codigo: 502, titulo: 'Ocurrió un error al enviar el correo electrónico', detalles: 'Ha ocurrido un error al enviar el correo electrónico, favor de intentarlo mas tarde' });
            else resolve()
        });
    });
}
