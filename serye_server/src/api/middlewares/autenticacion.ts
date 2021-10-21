import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NativeError } from 'mongoose';
import {SECRETA} from "../../config/globales";
import {IUsuario, Usuario} from "../componentes/modelos/usuario.model";

export let autenticacionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) verificarExpiracionToken(token, res, next);
    else return res.status(401).send({ titulo: 'No autorizado', detalles: 'Necesitar iniciar sesion para tener acceso' })
}

function verificarExpiracionToken(token: any, res: Response, next: NextFunction) {
    jwt.verify(token.split(' ')[1], SECRETA, function (err: any, decodificado: any) {
        if (err) return res.status(401).send({ titulo: 'Sesion expirada', detalles: 'La sesion ha expirado, por favor vuelve a iniciar sesion' });
        else {
            const usuario: IUsuario = decodificado;
            Usuario.findById(usuario._id)
                .exec((err: NativeError, usuarioEncontrado: IUsuario | null) => {
                    if (usuarioEncontrado) {
                        res.locals.usuario = usuarioEncontrado;
                        next();
                    } else {
                        return res.status(401).send({ titulo: 'No autorizado', detalles: 'Necesitar iniciar sesion para tener acceso' })
                    }
                })
        }
    })
}
