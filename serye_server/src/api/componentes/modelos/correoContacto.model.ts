import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';
import {ICategoriaCorreoContacto} from "./categoriaCorreoContacto.model";

mongoose.set('useUnifiedTopology', true);
const conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface ICorreoContacto extends Document {
    _id?: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    correo: string;
    mensaje: string;
    _idCategoriaCorreoConacto: ICategoriaCorreoContacto['_id'];
}
const correoContactoSchema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: false },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    mensaje: { type: String, required: false },
    _idCategoriaCorreoConacto: { type: Schema.Types.ObjectId, ref: 'CategoriaCorreoContacto', required: false},
});
correoContactoSchema.plugin(autoIncrement.plugin, { model: 'CorreoContacto', field: 'id' });
export const CorreoContacto = mongoose.model<ICorreoContacto>('CorreoContacto', correoContactoSchema);
