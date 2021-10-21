export default class Usuario {
    id: string;
    _id: string;
    conectado: boolean;
    tipo: number;
    _idSucursal: string;
    _idEmpresa: string;
    _idAccesoUsuario: string;

    constructor(id: string) {
        this.id = id;
        this._id = '';
        this.conectado = false;
        this.tipo = -1;
        this._idSucursal = '';
        this._idEmpresa = '';
        this._idAccesoUsuario = '';
    }

    reiniciarUsuario(id: string) {
        this.id = id;
        this._id = '';
        this.conectado = false;
        this.tipo = -1;
        this._idSucursal = '';
        this._idEmpresa = '';
        this._idAccesoUsuario = '';
    }
}