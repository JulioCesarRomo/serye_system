import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import {EMAIL_CORREOS} from "../../constantes/email-correos.constant";
import {IUsuario, Usuario} from "../modelos/usuario.model";
import {NativeError} from "mongoose";


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: EMAIL_CORREOS
})
/*** GET ***/
//OBTENER LOS USUARIOS FILTRADOS
export let obtenerUsuariosFiltrados = (req: Request, res: Response) => {
    const filtro: string = String(req.query.filtro);
    const activo: boolean = req.query.activo == 'true';
    const inicio: number = Number(req.query.inicio);
    const fin: number = Number(req.query.fin);
    _obtenerUsuariosFiltradosAdministradorEmpleado(filtro, activo, inicio, fin, res);
}

//OBTENER EL NUMERO DE USUARIOS QUE HA SIDO FILTRADO
export let obtenerNumUsuariosFiltrados = (req: Request, res: Response) => {
    const filtro: string = String(req.query.filtro);
    const activo: boolean = req.query.activo == 'true';
    _obtenerNumUsuariosFiltradosAdministradorEmpleado(filtro, activo, res);
}
//VALIDAR ECISTENCIA DEL NOMBRE DE USUARIO
export let existeNombreUsuario = (req: Request, res: Response) => {
    const usuario = <string>req.query.usuario;
    Usuario.findOne({ usuario }).exec((err: NativeError, usuarioEncontrado: IUsuario | null) => {
        if (err) return res.status(422).send({ titulo: 'Error al verificar usuario', detalles: 'Ocurrio un error al verficiar si el nombre de usuario existe, por favor intentalo de nuevo mas tarde' });
        if (usuarioEncontrado) return res.status(200).json({ existe: true })
        else return res.status(200).json({ existe: false })
    })
}
/*** GET ***/
function _obtenerUsuariosFiltradosAdministradorEmpleado(filtro: string, activo: boolean, inicio: number, fin: number, res: Response) {
    if (!inicio && !fin) {
        Usuario.aggregate()
            .match({activo})
            .project({
                activo: 1,
                nombre: 1,
                apepat: 1,
                apemat: 1,
                usuario: 1,
                correo: 1,
                rfc: 1,
                nombreCompleto: { $concat: ["$nombre", " ", "$apepat"] },
                nombreCompletoApemat: { $concat: ["$nombre", " ", "$apepat", " ", "$apemat"] }
            })
            .match({
                $or: [
                    { nombre: { $regex: filtro, $options: "i" } },
                    { apepat: { $regex: filtro, $options: "i" } },
                    { apemat: { $regex: filtro, $options: "i" } },
                    { usuario: { $regex: filtro, $options: "i" } },
                    { nombreCompleto: { $regex: filtro, $options: "i" } },
                    { nombreCompletoApemat: { $regex: filtro, $options: "i" } }
                ]
            })
            .project({ id: 0, _idDireccion: 0, rutaLogo: 0, nombreFoto: 0, rutaFoto: 0, tipoDePersona: 0, telefonos: 0, contrasenas: 0, personalizacion: 0, codigoRecuperacion: 0, sucursales: 0, _idAccesoUsuario: 0, _idUsuario: 0, conectado: 0, fechaRegistro: 0, __v: 0 })
            .exec((err: NativeError, usuarios: any[]) => {
                if (err) return res.status(422).send({ titulo: 'Error al obtener los usuarios', detalles: 'Ocurrio un error al obtener los usuarios, por favor intentalo de nuevo mas tarde' });
                return res.status(200).json(usuarios);
            })
    } else {
        Usuario.aggregate()
            .match({activo})
            .project({
                activo: 1,
                nombre: 1,
                apepat: 1,
                apemat: 1,
                usuario: 1,
                correo: 1,
                rfc: 1,
                nombreCompleto: { $concat: ["$nombre", " ", "$apepat"] },
                nombreCompletoApemat: { $concat: ["$nombre", " ", "$apepat", " ", "$apemat"] }
            })
            .match({
                $or: [
                    { nombre: { $regex: filtro, $options: "i" } },
                    { apepat: { $regex: filtro, $options: "i" } },
                    { apemat: { $regex: filtro, $options: "i" } },
                    { usuario: { $regex: filtro, $options: "i" } },
                    { correo: { $regex: filtro, $options: "i" } },
                    { rfc: { $regex: filtro, $options: "i" } },
                    { nombreCompleto: { $regex: filtro, $options: "i" } },
                    { nombreCompletoApemat: { $regex: filtro, $options: "i" } },
                ]
            })
            .skip(inicio)
            .limit(fin)
            .project({ id: 0, _idDireccion: 0, rutaLogo: 0, nombreFoto: 0, rutaFoto: 0, tipoDePersona: 0, telefonos: 0, contrasenas: 0, personalizacion: 0, codigoRecuperacion: 0, sucursales: 0, _idAccesoUsuario: 0, _idUsuario: 0, conectado: 0, fechaRegistro: 0, __v: 0 })
            .exec((err: NativeError, usuarios: any[]) => {
                if (err) return res.status(422).send({ titulo: 'Error al obtener los usuarios', detalles: 'Ocurrio un error al obtener los usuarios, por favor intentalo de nuevo mas tarde' });
                return res.status(200).json(usuarios);
            })
    }
}
function _obtenerNumUsuariosFiltradosAdministradorEmpleado(filtro: string, activo: boolean, res: Response) {
    Usuario.aggregate()
        .match({activo})
        .project({
            activo: 1,
            nombre: 1,
            apepat: 1,
            apemat: 1,
            usuario: 1,
            correo: 1,
            rfc: 1,
            nombreCompleto: { $concat: ["$nombre", " ", "$apepat"] },
            nombreCompletoApemat: { $concat: ["$nombre", " ", "$apepat", " ", "$apemat"] }
        })
        .match({
            $or: [
                { nombre: { $regex: filtro, $options: "i" } },
                { apepat: { $regex: filtro, $options: "i" } },
                { apemat: { $regex: filtro, $options: "i" } },
                { usuario: { $regex: filtro, $options: "i" } },
                { correo: { $regex: filtro, $options: "i" } },
                { rfc: { $regex: filtro, $options: "i" } },
                { nombreCompleto: { $regex: filtro, $options: "i" } },
                { nombreCompletoApemat: { $regex: filtro, $options: "i" } },
                // { '_idSucursal.nombre': { $regex: filtro, $options: "i" } }
            ]
        })
        .group({
            _id: null,
            total: { $sum: 1 }
        })
        .exec((err: NativeError, resultado: any[]) => {
            if (err) return res.status(422).send({ titulo: 'Error al obtener los usuarios', detalles: 'Ocurrio un error al obtener los usuarios, por favor intentalo de nuevo mas tarde' });
            if (!resultado[0]) return res.status(200).json(0);
            else return res.status(200).json(resultado[0].total);
        })
}
