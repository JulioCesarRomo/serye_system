import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';
import {ICategoria} from "./categoria.model";

mongoose.set('useUnifiedTopology', true);
const conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface IMarca extends Document {
    nombre: string
    nombreImagen: string;
    _idCategoria: ICategoria['_id'];
}
const marcaSchema = new Schema({
    nombre: { type: String, required: true },
    nombreImagen: { type: String, required: false },
    _idCategoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: false},
});
marcaSchema.plugin(autoIncrement.plugin, { model: 'Marca', field: 'id' });
export const Marca = mongoose.model<IMarca>('Marca', marcaSchema);
