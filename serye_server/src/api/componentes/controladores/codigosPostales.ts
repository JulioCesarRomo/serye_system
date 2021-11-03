import { Request, Response } from 'express';
import {NativeError} from "mongoose";
import {CodigoPostal, ICodigoPostal} from "../modelos/codigoPostal.model";
import {Categoria} from "../modelos/categoria.model";

export let obtenerCodigosPostales = async (req: Request, res: Response) => {
    try {
        const codigosPostales: ICodigoPostal[] = await _obtenerCodigosPostales();
        res.status(200).json(codigosPostales);
    } catch (err) {
        res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}
export let obtenerCodigoPostal = async (req: Request, res: Response) => {
    try {
        console.log(req.query.id);
        const codigoPostal: ICodigoPostal = await _obtenerCodigoPostal(<string>req.query.id);
        res.status(200).json(codigoPostal);
    } catch (err) {
        res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}
export let filtrarCodigosPostalesPorClave = async (req: Request, res: Response) => {
    try {
        const codigosPostales: ICodigoPostal[] = await _filtrarCodigosPostalesPorClave(<string>req.query.clave);
        res.status(200).json(codigosPostales);
    } catch (err) {
        res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}
export let obtenerClavesCodigosPostales = async (req: Request, res: Response) => {
    try {
        console.log('LLEGA')
        const clavesCodigosPostales = await _obtenerClavesCodigosPostales();
        // @ts-ignore
        clavesCodigosPostales.forEach(clave => {
            if((<any>clave)._id === '20126'){
                console.log('ajsndaklsda');
            }
        })
        res.status(200).json(clavesCodigosPostales);
    } catch (err) {
        res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}

async function _obtenerCodigosPostales(){
    return new Promise<ICodigoPostal[]>((resolve, reject) => {
        CodigoPostal.find()
            .exec((err: NativeError, codigosPostales: ICodigoPostal[]) => {
                if(err) {
                    reject({ codigo: 422, titulo: 'Error al obtener los codigos postales',
                        detalles: 'Ocurrio un error al obtener los codigos postales, por favor intentalo de nuevo mas tarde'});
                } else if (codigosPostales) {
                    resolve(codigosPostales);
                } else {
                    reject({ codigo: 422, titulo: 'Error interno',
                        detalles: 'Ocurrio un error interno, por favor intentalo de nuevo mas tarde'});
                }
            });
    });
}

async function _obtenerCodigoPostal(_id: string){
    return new Promise<ICodigoPostal>((resolve, reject) => {
        CodigoPostal.findOne({ _id })
            .exec((err: NativeError, codigoPostal: ICodigoPostal | null) => {
                if(err) {
                    console.log(err);
                    reject({ codigo: 422, titulo: 'Error al obtener el codigo postal',
                        detalles: 'Ocurrio un error al obtener el codigo postal, por favor intentalo de nuevo mas tarde'});
                } else if (codigoPostal) {
                    resolve(codigoPostal);
                } else {
                    reject({ codigo: 422, titulo: 'Error interno',
                        detalles: 'Ocurrio un error interno, por favor intentalo de nuevo mas tarde'});
                }
            });
    });
}

async function _filtrarCodigosPostalesPorClave(clave: string){
    return new Promise<ICodigoPostal[]>((resolve, reject) => {
        CodigoPostal.find({d_codigo: clave})
            .sort({ d_asenta: 1 })
            .exec((err: NativeError, codigosPostales: ICodigoPostal[]) => {
                if(err) {
                    reject({ codigo: 422, titulo: 'Error al obtener los codigos postales',
                        detalles: 'Ocurrio un error al obtener los codigos postales, por favor intentalo de nuevo mas tarde'});
                } else if (codigosPostales) {
                    resolve(codigosPostales);
                } else {
                    reject({ codigo: 422, titulo: 'Error interno',
                        detalles: 'Ocurrio un error interno, por favor intentalo de nuevo mas tarde'});
                }
            });
    });
}

async function _obtenerClavesCodigosPostales(){
    return new Promise((resolve, reject) => {
        CodigoPostal.aggregate(
            [
                {
                    $group : {
                        _id : '$d_codigo',
                    }
                },
            ],(err: NativeError, clavesCodigosPostales: any[]) => {
                if (err) {
                    console.log(err);
                    reject({ codigo: 422, titulo: 'Error al cargar las claves de codigo postal',
                        detalles: 'Ocurrio un error al cargar las claves de codigo postal, intentalo más tarde'});
                } else if(clavesCodigosPostales){
                    resolve(clavesCodigosPostales);
                } else {
                    reject({ codigo: 422, titulo: 'Error interno',
                        detalles: 'Ocurrio un error interno, por favor intentalo de nuevo mas tarde'});
                }
            }
        )
    });
}
async function _obtenerCategorias(){
    return new Promise((resolve, reject) => {
        Categoria.aggregate(
            [
                {
                    $group : {
                        _id : '$parent',
                        categorias: { $push: { _id: '$_id', nombre: '$nombre'} }
                    },
                    /*$sort: {
                        _id: 1,
                    }*/
                },
            ], (err: NativeError, categorias: any) => {
                if (err) {
                    console.log(err);
                    reject({ codigo: 422, titulo: 'Error al cargar las categorías',
                        detalles: 'Ocurrio un error al cargar las categoría, intentalo más tarde'});
                } else if(categorias){
                    resolve(categorias);
                } else {
                    reject({ codigo: 422, titulo: 'Error interno',
                        detalles: 'Ocurrio un error interno, por favor intentalo de nuevo mas tarde'});
                }
            }
        );
    });
}
