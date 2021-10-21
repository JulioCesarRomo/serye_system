import { Request, Response } from 'express';
import {NativeError} from "mongoose";
import {Categoria, ICategoria} from "../modelos/categoria.model";
import {IMarca, Marca} from "../modelos/marca.model";
import {CategoriaCorreoContacto, ICategoriaCorreoContacto} from "../modelos/categoriaCorreoContacto.model";

export let obtenerCategorias = async (req: Request, res: Response) => {
    try {
        const categorias: any[] = await _obtenerCategorias();
        categorias.sort( (a,b) => {
            if (a.nombre > b.nombre) return 1;
            if (a.nombre < b.nombre) return -1;
            return 0;
        });
        /*categorias.unshift(
            {
                _id: 'all',
                name: 'Mostrar todo'
            }
        )*/
        return res.status(200).json(categorias);
    } catch (err: any) {
        return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}
export let obtenerCategoriasCorreoContacto = async (req: Request, res: Response) => {
    try {
        const categoriasCorreoContacto: ICategoriaCorreoContacto[] = await _obtenerCategoriasCorreoContacto();

        categoriasCorreoContacto.sort( (a,b) => {
            if (a.nombre > b.nombre) return 1;
            if (a.nombre < b.nombre) return -1;
            return 0;
        });
        return res.status(200).json(categoriasCorreoContacto);
    } catch (err: any) {
        return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}
export let obtenerMarcasPorCategoria = async (req: Request, res: Response) => {
    try {
        const marcas: IMarca[] = await _obtenerMarcasPorCategoria(String(req.query._idCategoria));
        marcas.sort( (a,b) => {
            if (a.nombre > b.nombre) return 1;
            if (a.nombre < b.nombre) return -1;
            return 0;
        });
        return res.status(200).json(marcas);
    } catch (err: any) {
        return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}

export let obtenerCategoriasSeccionadas = async (req: Request, res: Response) => {
    try {
        const categoriasSeccionadas: any[] = [];
        const categorias: any[] = await _obtenerCategorias();
        categorias.sort( (a,b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });
        categoriasSeccionadas.push(categorias.slice(0, (categorias.length/4) + 1));
        categoriasSeccionadas.push(categorias.slice((categorias.length/4) + 1, (categorias.length/2) + 1));
        categoriasSeccionadas.push(categorias.slice((categorias.length/2) + 1, (categorias.length - (categorias.length/4) + 1)));
        categoriasSeccionadas.push(categorias.slice((categorias.length - (categorias.length/4) + 1), categorias.length));
        return res.status(200).json(categoriasSeccionadas);
    } catch (err: any) {
        return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}
export let obtenerCategoriasPorParent = async (req: Request, res: Response) => {
    try {
        const categoriasPorPadre: any[] = await _obtenerCategoriasPorParent(<string>req.query.parent);
        categoriasPorPadre.sort( (a,b) => {
            if (a._id > b._id) return 1;
            if (a._id < b._id) return -1;
            return 0;
        });
        /*categoriasPorPadre.forEach((categoriaPorPadre) => {
            categoriaPorPadre.categorias.sort((a: { nombre: number; }, b: { nombre: number; }) => {
                if (a.nombre > b.nombre) return 1;
                if (a.nombre < b.nombre) return -1;
                return 0;
            })
        })*/
        return res.status(200).json(categoriasPorPadre);
    } catch (err: any) {
        return res.status(err.codigo).send({titulo: err.titulo, detalles: err.detalles});
    }
}

async function _obtenerCategorias(){
    return new Promise<any[]>((resolve, reject) => {
        Categoria.find()
            .exec((err: NativeError, categorias: ICategoria[]) => {
                if (err) {
                    console.log(err);
                    reject({ codigo: 422, titulo: 'Error al obtener las categorías',
                        detalles: 'Ocurrio un error al obtener las categoría, intentalo más tarde'});
                } else if(categorias){
                    resolve(categorias);
                } else {
                    reject({ codigo: 422, titulo: 'Error interno al obtener las categorías',
                        detalles: 'Ocurrio un error interno al obtener las categorías, por favor intentalo de nuevo mas tarde'});
                }
            }
        );
    });
}
async function _obtenerCategoriasCorreoContacto(){
    return new Promise<any[]>((resolve, reject) => {
        CategoriaCorreoContacto.find()
            .exec((err: NativeError, categoriasCorreoContacto: ICategoriaCorreoContacto[]) => {
                    if (err) reject({ codigo: 422, titulo: 'Error al obtener las categorías de correo',
                        detalles: 'Ocurrio un error al obtener las categorías de correo, intentalo más tarde'});
                    else if(categoriasCorreoContacto) resolve(categoriasCorreoContacto);
                    else reject({ codigo: 422, titulo: 'Error interno al obtener las categorías de correo',
                            detalles: 'Ocurrio un error interno al obtener las categorías de correo, por favor intentalo de nuevo mas tarde'});
                }
            );
    });
}

async function _obtenerMarcasPorCategoria(_idCategoria: string){
    return new Promise<IMarca[]>((resolve, reject) => {
        Marca.find({_idCategoria})
            .exec((err: NativeError, marcas: IMarca[]) => {
                    if (err) reject({ codigo: 422, titulo: 'Error al obtener las categorías',
                        detalles: 'Ocurrio un error al obtener las categoría, intentalo más tarde'});
                    else if(marcas) resolve(marcas);
                    else reject({ codigo: 422, titulo: 'Error interno al obtener las categorías',
                            detalles: 'Ocurrio un error interno al obtener las categorías, por favor intentalo de nuevo mas tarde'});
                }
            );
    });
}
async function _obtenerCategoriasPorParent(parent: string){
    return new Promise<any[]>((resolve, reject) => {
        Categoria.find({parent})
            .exec((err: NativeError, categorias: any) => {
                if (err) {
                    reject({ codigo: 422, titulo: 'Error al cargar las categorías por padre',
                        detalles: 'Ocurrio un error al cargar las categoría por padre, intentalo más tarde'});
                } else if(categorias) {
                    resolve(categorias);
                } else {
                    reject({ codigo: 422, titulo: 'Error interno',
                        detalles: 'Ocurrio un error interno, por favor intentalo de nuevo mas tarde'});
                }
            }
        );
    });
}
