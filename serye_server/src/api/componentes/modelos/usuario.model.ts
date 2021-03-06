import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';
import {IDireccion} from "./direccion.model";

mongoose.set('useUnifiedTopology', true);
var conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface IUsuario extends Document {
    id: number;
    usuario: string;
    tipo: number;
    nombre: string;
    apepat: string;
    apemat: string;
    agregarDireccion: boolean;
    _idDireccion: IDireccion['_id'];
    correo: string;
    nombreFoto: string;
    rutaFoto: string;
    tipoDePersona: number;
    rfc: string;
    telefono: string[];
    contrasenas: {
        correo: string;
        contrasena: string;
        _idUsuario: IUsuario['_id'];
        fechaRegistro: Date;
        activo: boolean;
    }[];
    codigoRecuperacion: string;
    moduloActivo: number;
    _idAccesoUsuario: IUsuario['_id'];
    _idUsuario: IUsuario['_id'];
    horario: {
        dia: number;
        horaInicio: string;
        horaFin: string;
        fechaRegistro: Date;
        activo: boolean;
    }[];
    idTemaInterfaz: number;
    tieneHorario: boolean;
    mismoHorario: boolean;
    administrandoFolios: boolean;
    fechaRegistro: Date;
    conectado: boolean;
    activo: boolean;
}
const usuarioSchema = new Schema({
    id: { type: Number, required: false },
    usuario: { type: String, required: [true, 'Por favor, ingresa el campo Usuario'] },
    tipo: { type: Number, required: [true, 'Por favor, ingresa el campo Tipo'] },
    nombre: { type: String, required: [true, 'Por favor, ingresa el campo Nombre'] },
    apepat: { type: String, required: [true, 'Por favor, ingresa el campo Apellido paterno'] },
    apemat: { type: String, required: false },
    agregarDireccion: { type: Boolean, required: false },
    _idDireccion: { type: Schema.Types.ObjectId, ref: 'Direccion' },
    correo: { type: String, required: [true, 'Por favor, ingresa el campo Correo electr??nico'] },
    nombreFoto: { type: String, required: false },
    rutaFoto: { type: String, required: false },
    tipoDePersona: { type: Number, required: false },
    rfc: { type: String, required: false },
    telefono: [{ type: String, required: false }],
    contrasenas: {
        type: [{
            contrasena: { type: String, required: true },
            fechaRegistro: { type: Date, required: false, default: new Date(Date.now()) },
            activo: { type: Boolean, required: false, default: true }
        }]
    },
    codigoRecuperacion: { type: String, required: false },
    _idUsuario: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    horario: {
        type: [{
            dia: { type: Number, required: true },
            horaInicio: { type: String, required: true },
            horaFin: { type: String, required: true },
            fechaRegistro: { type: Date, required: false, default: new Date(Date.now()) },
            activo: { type: Boolean, required: false, default: true }
        }], required: false
    },
    idTemaInterfaz: { type: Number, required: true },
    tieneHorario: { type: Boolean, required: false },
    mismoHorario: { type: Boolean, required: false },
    conectado: { type: Boolean, required: false, default: false },
    administrandoFolios: { type: Boolean, required: false, default: false },
    fechaRegistro: { type: Date, required: false, default: new Date(Date.now()) },
    activo: { type: Boolean, required: false, default: true },
});
function limiteArray(val: any) {
    return val.length <= 2;
}
usuarioSchema.set('toObject', { virtuals: true });
usuarioSchema.set('toJSON', { virtuals: true });
usuarioSchema.plugin(autoIncrement.plugin, { model: 'Usuario', field: 'id' });
export const Usuario = mongoose.model<IUsuario>('Usuario', usuarioSchema);
