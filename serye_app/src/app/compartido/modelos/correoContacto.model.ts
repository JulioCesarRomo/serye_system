import {CategoriaCorreoContacto} from "./categoriaCorreoContacto.model";

export class CorreoContacto {
    _id?: string;
    nombre: string;
    apellidos?: string;
    telefono: string;
    correo: string;
    mensaje: string = '';
    _idCategoriaCorreoConacto: CategoriaCorreoContacto | string;
    constructor() {
        this.nombre = '';
        this.telefono = ''
        this.correo = ''
        this._idCategoriaCorreoConacto = new CategoriaCorreoContacto();
    }
}
