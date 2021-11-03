import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import {EMAIL_CORREOS} from "../../constantes/email-correos.constant";
import {IUsuario, Usuario} from "../modelos/usuario.model";
import {NativeError} from "mongoose";
import {TemasInterfaz} from "../../enumeraciones/temas-interfaz.enum";


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

/*** POST ***/
//GUARDAR NUEVO USUARIO
export let guardarNuevoUsuario = async (req: Request, res: Response) => {
    try {
        const nuevoUsuario: IUsuario = new Usuario(req.body);
        nuevoUsuario.fechaRegistro = new Date(Date.now());
        nuevoUsuario.idTemaInterfaz = TemasInterfaz.Claro;
        nuevoUsuario._idUsuario = res.locals.usuario._id;
        const nuevoUsuarioGuardado: IUsuario =  await _guardarNuevoUsuario(nuevoUsuario);
        await _enviarCorreoBienvenidaNuevoUsuario(nuevoUsuario);
        return res.status(200).json(nuevoUsuarioGuardado);
    } catch (err) {
        console.log(err);
        return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
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
/*** POST ***/
//GUARDAR NUEVO USUARIO
async function _guardarNuevoUsuario(nuevoUsuario: IUsuario) {
    return new Promise<IUsuario>((resolve, reject) => {
        // @ts-ignore
        nuevoUsuario.save((err: NativeError, nuevoAccesoGuardado: IUsuario) => {
            if(err) {
                console.log(err);
                reject({ codigo: 422, titulo: 'Error al registrar el usuario',
                    detalles: 'Ocurrio un error al registrar el nuevo usuario, por favor intentalo de nuevo mas tarde'});
            } else if (nuevoAccesoGuardado) resolve(nuevoAccesoGuardado)
            else reject({ codigo: 422, titulo: 'Error interno al registrar el usuario',
                    detalles: 'Ocurrio un error interno al registrar el usuario, por favor intentalo más tarde'});
        });
    });
}
//ENVIAR CORREO DE BIENVENIDA AL NUEVO USUARIO
export async function _enviarCorreoBienvenidaNuevoUsuario(nuevoUsuario: IUsuario) {
    return new Promise<void>(async (resolve, reject) => {
        const mailOptions = {
            from: '"Solicitud de contacto 👻" <julio-cesar-1997@hotmail.com>', // sender address
            to: nuevoUsuario.correo, // list of receivers
            subject: "Bienvenido a SERYE !!! 👻" , // Subject line
            html:
                `<!DOCTYPE html>
                  <html lang="en">
                  <style type="text/css">
                    body { margin: auto }
                    .contenedor-principal {
                        margin: auto; width: 50%; padding: 10px;
                    }
                    table {width: 100%; border: none;}
                    </style>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                  </head>
                  <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet'>
                  <body>
                  <div class="contenedor-general">
                    <table style="font-weight: bold;">
                      <th align="center">
                       <div style="background-color: #0792d8; width: 50%; height: 13px;
                       border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"></div>
                      </th>
                      <tbody>
                        <tr>
                          <td align="center">
                            <img src="https://serye.net:5529/default/logo.png" alt="serye.net" width="50%">
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                              <div style="width: 75%; height: 2pt; background-color: black; opacity: 0.2;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <span style="color: #3B5998; font-size: 21pt; font-family: 'Montserrat', sans-serif;">
                              Nueva solicitud de contacto
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                              <span style="color: #222f41; font-size: 20pt; font-weight: 500; font-family: Montserrat, Semi-bold, sans-serif;">
                              Bienvenido ` + nuevoUsuario.nombre + (nuevoUsuario.apepat != '' ? ` ${nuevoUsuario.apemat}`:'') + `!!!.
                              Se muestran detalles de la solicitud.
                              </span>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <div style="width: 113px; height: 2.5pt; background-color: rgb(22, 204, 22); opacity: 0.7;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <span style="color: #379bd2; font-size: 20pt; font-family: 'Raleway', sans-serif;">
                                <a>https://serye.net</a>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <div style="background-color: #0792d8; width: 75%; height: 13px; border-top-right-radius: 10px; border-top-left-radius: 10px;"></div>
                          </td>
                        </tr>                      
                      </tbody>
                    </table>
                  </div>
                  <div style="margin: auto; padding: 10px">
                  </div>
                  </body>
                  </html>`,
        };
        //@ts-ignore
        transporter.sendMail(mailOptions, (err: any, info: string) => {
            if(err) {
                console.log(err)
                resolve();
            }
            else if(info) resolve();
            else resolve();
        });
    });
}
