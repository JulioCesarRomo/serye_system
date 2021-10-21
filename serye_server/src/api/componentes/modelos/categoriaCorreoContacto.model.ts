import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';

mongoose.set('useUnifiedTopology', true);
const conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface ICategoriaCorreoContacto extends Document {
    nombre: string
    descripcion: string;
}
const categoriaCorreoContactoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
});
categoriaCorreoContactoSchema.plugin(autoIncrement.plugin, { model: 'CategoriaCorreoContacto', field: 'id' });
export const CategoriaCorreoContacto = mongoose.model<ICategoriaCorreoContacto>('CategoriaCorreoContacto', categoriaCorreoContactoSchema);
