import { Direccion } from './direccion.model';
import { Usuario } from './usuario.model';

export class Cliente {
    _id?: string;
    id?: number;
    tipoDePersona: number;
    nombre?: string;
    apepat?: string;
    apemat?: string;
    agregarDireccionEnvio: boolean;
    _idDireccionEnvio: Direccion;
    direccionesIguales?: boolean;
    agregarDireccionFacturacion: boolean;
    _idDireccionFacturacion?: Direccion;
    correo?: string;
    nombreFoto?: string;
    rutaFoto?: string;
    agregarRepresentante?: boolean;
    nombreRepresentante?: string;
    apepatRepresentante?: string;
    apematRepresentante?: string;
    razonSocial?: string;
    rfc?: string;
    telefonos?: string[];
    _idUsuario?: Usuario | string;
    fechaRegistro?: Date;
    activo?: boolean;

    constructor() {
        this.agregarDireccionEnvio = false;
        this._idDireccionEnvio = new Direccion();
        this.agregarDireccionFacturacion = false;
        this.direccionesIguales = false;
        this._idDireccionFacturacion = new Direccion();
        this.agregarRepresentante = false;
        this.telefonos = [];
    }
}
