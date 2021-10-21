import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';

mongoose.set('useUnifiedTopology', true);
const conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface ICategoria extends Document {
    nombre: string
    nombreImagen: string;
    categorias: ICategoria['_id'];
}
const categoriaSchema = new Schema({
    nombre: { type: String, required: true },
    nombreImagen: { type: String, required: false },
    categorias: { type: Array, required: false },
});
categoriaSchema.plugin(autoIncrement.plugin, { model: 'Categoria', field: 'id' });
export const Categoria = mongoose.model<ICategoria>('Categoria', categoriaSchema);
