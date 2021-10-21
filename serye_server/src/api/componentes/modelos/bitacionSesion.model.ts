import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { IUsuario } from './usuario.model';
import { BD_URL } from '../../../config/bd';

mongoose.set('useUnifiedTopology', true);
var conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface IBitacoraSesion extends Document {
    id: number;
    _idUsuario: IUsuario['_id'];
    fechaRegistro: Date;
}

const bitacoraSesionSchema = new Schema({
    id: { type: Number, required: false },
    _idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'Por favor, ingresa el campo Usuario'] },
    fechaRegistro: { type: Date, required: false, default: new Date(Date.now()) },
}, { collection: "bitacorainiciosesion" })

bitacoraSesionSchema.plugin(autoIncrement.plugin, { model: 'BitacoraSesion', field: 'id' });
export const BitacoraSesion = mongoose.model<IBitacoraSesion>('BitacoraSesion', bitacoraSesionSchema);