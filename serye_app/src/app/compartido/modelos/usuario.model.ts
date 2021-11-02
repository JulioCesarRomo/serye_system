import {CodigoPostal} from "./codigoPostal.model";
import {TiposUsuario} from "../enumeraciones/tipos-usuario.enum";

export class Horario {
    dia: number;
    horaInicio?: string;
    horaFin?: string;
    fechaRegistro?: Date;
    activo?: boolean;
}
export class ContrasenaUsuario {
    correo?: string;
    contrasena?: string;
    _idUsuario?: Usuario;
    fechaRegistro?: Date;
    activo?: boolean;
    constructor() { }
}
export class Usuario {
    _id?: string;
    id?: number;
    usuario: string;
    tipo: number;
    nombre: string;
    apepat: string;
    apemat?: string;
    omitirDireccion?: boolean;
    correo: string;
    nombreFoto?: string;
    rutaFoto?: string;
    tipoDePersona: number;
    rfc?: string;
    telefono: string;
    telefonos?: string[];
    //VARIABLES PARA LA DIRECCION
    _idCodigoPostal: CodigoPostal;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    //personalizacion?: Personalizacion;
    //configuracion?: Configuracion;
    //permisosGlobales?: PermisosGlobales;
    _idUsuarioPadre?: Usuario | string;
    fechaRegistro?: Date;
    contrasenas?: ContrasenaUsuario[];
    tieneHorario: boolean;
    mismoHorario: boolean;
    horario: Horario[];
    activo?: boolean;

    constructor() {
        this.omitirDireccion = true;
        this.telefonos = [];
        this.tipo = TiposUsuario.Empleado;
        //this.personalizacion = new Personalizacion();
        //this.configuracion = new Configuracion();
        //this.permisosGlobales = new PermisosGlobales();
        this.horario = [];
        this.contrasenas = [];
        this._idCodigoPostal = new CodigoPostal();
    }
}
