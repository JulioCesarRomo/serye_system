import { Request, Response } from 'express';
import {NativeError} from "mongoose";
import {ISlideCarrusel, SlideCarrusel} from "../modelos/slideCarrusel.model";
import {CorreoContacto, ICorreoContacto} from "../modelos/correoContacto.model";
import {CategoriaCorreoContacto, ICategoriaCorreoContacto} from "../modelos/categoriaCorreoContacto.model";
const nodemailer = require("nodemailer");
require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // hostname
    service: 'hotmail',
    secure: false,
    secureConnection: false,
    port: 587,
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: 'julio-cesar-1997@hotmail.com',
        pass: '$753JulioRomo951$'
    },
});
/*export const EMAIL_CORREO = {
    user: 'julio-cesar-1997@hotmail.com',
    pass: '$753JulioRomo951$'
};*/

export let obtenerSlidesCarruselActivasInactivasCarrusel = async (req: Request, res: Response) => {
    try {
        const slidesCarousel: ISlideCarrusel[] = await _obtenerSlidesCarruselActivasInactivas(<boolean><unknown>req.query.activo);
        return res.status(200).json(slidesCarousel)}
    catch (err: any) { return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles}); }
}
export let guardarEnviarCorreoContacto = async (req: Request, res: Response) => {
    try {
        let correoContacto: ICorreoContacto = new CorreoContacto(<ICorreoContacto>req.body);
        correoContacto = await _guardarNuevoCorreoContacto(correoContacto);
        await _enviarCorreoContacto(correoContacto);
        return res.status(200).json()}
    catch (err: any) {
        return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles}); }
}

async function _obtenerSlidesCarruselActivasInactivas(activo: boolean){
    return new Promise<ISlideCarrusel[]>((resolve, reject) => {
        SlideCarrusel.find({activo})
            .sort({idOrden: 1})
            .exec((err: NativeError, slidesCarousel: ISlideCarrusel[]) => {
                if(err) reject({ codigo: 422, titulo: 'Error al obtener las slides',
                    detalles: 'Ocurrio un error al obtener las slides, por favor intentalo de nuevo mas tarde'});
                else if(slidesCarousel) resolve(slidesCarousel)
                else reject({ codigo: 422, titulo: 'Error interno',
                        detalles: 'Ocurrio un error interno, por favor intentalo de nuevo mas tarde'});
            });
    });
}
async function _guardarNuevoCorreoContacto(correoContacto: ICorreoContacto){
    return new Promise<ICorreoContacto>((resolve, reject) => {
        // @ts-ignore
        correoContacto.save((err: NativeError, correoContactoGuardado: ICorreoContacto | null) => {
            if(err) reject({ codigo: 422, titulo: 'Error al registrar el correo',
                detalles: 'Ocurrio un error al registrar el nuevo correo, por favor intentalo de nuevo mas tarde'});
            else if(correoContactoGuardado) {
                correoContactoGuardado.populate({ path: '_idCategoriaCorreoConacto', model: CategoriaCorreoContacto })
                    .execPopulate()
                    .then((correoContactoGuardadoPopulate: ICorreoContacto) => {
                        resolve(correoContactoGuardadoPopulate)
                    })

            }
            else reject({ codigo: 422, titulo: 'Error interno al registrar el correo',
                    detalles: 'Ocurrio un error interno al registrar el correo, por favor intentalo de nuevo mas tarde'});
        })
    });
}
export async function _enviarCorreoContacto(correoContacto: ICorreoContacto) {
        return new Promise<void>(async (resolve, reject) => {
            const mailOptions = {
                from: '"Solicitud de contacto 👻" <julio-cesar-1997@hotmail.com>', // sender address
                to: 'julio-cesar-1997@hotmail.com, cotizaciones@serye.net, cotizaciones2@serye.net', // list of receivers
                subject: "Nueva solicitud de contacto 👻" , // Subject line
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
                              ` + correoContacto.nombre + (correoContacto.apellidos != '' ? ` ${correoContacto.apellidos}`:'') + ` quiere ponerse en contacto.
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
                    <table>
                      <tr style="border-bottom: 1pt solid white;">
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Solicitud</th>
                      </tr>          
                      <tr style="border-bottom: 1pt solid white;">
                        <td>` + correoContacto.nombre + (correoContacto.apellidos != '' ? ` ${correoContacto.apellidos}`:'') + `</td>
                        <td>` + correoContacto.telefono + `</td>
                        <td>` + correoContacto.correo + `</td>
                        <td>` + (<ICategoriaCorreoContacto>correoContacto._idCategoriaCorreoConacto).nombre + `</td>
                      </tr>
                      <tr>
                        <td COLSPAN="3"><b>Detalles:</b>` + correoContacto.mensaje + `</td>
                      </tr>
                    </table>
                    <div>` + correoContacto.mensaje + `</div>
                  </div>
                  </body>
                  </html>`,
            };
            transporter.sendMail(mailOptions, (err: any, info: string) => {
                if(err) {
                    console.log(err)
                    reject({ codigo: 422, titulo: 'Error al envíar el correo',
                        detalles: 'Ocurrio un error al envíar el correos, por favor intentalo de nuevo mas tarde'});
                }
                else if(info) {
                    console.log(info);
                    resolve();
                }
                else reject({ codigo: 422, titulo: 'Error interno al envíar el correo',
                        detalles: 'Ocurrio un error interno al envíar el correo, por favor intentalo de nuevo mas tarde'});
            });
        });
}
