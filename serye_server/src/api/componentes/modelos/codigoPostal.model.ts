import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';

mongoose.set('useUnifiedTopology', true);
const conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface ICodigoPostal extends Document {
    d_codigo: string;
    d_asenta: string;
    d_tipo_asenta: string;
    D_mnpio: string;
    d_estado: string;
    d_ciudad: string;
    d_CP: string;
    c_estado: string;
    c_oficina: string;
    c_tipo_asenta: string;
    c_mnpio: string;
    id_asenta_cpcons: string;
    d_zona: string;
    c_cve_ciudad: string;
}
const codigoPostalSchema = new Schema({
    d_codigo: { type: String, required: false },
    d_asenta: { type: String, required: false },
    d_tipo_asenta: { type: String, required: false },
    D_mnpio: { type: String, required: false },
    d_estado: { type: String, required: false },
    d_ciudad: { type: String, required: false },
    d_CP: { type: String, required: false },
    c_estado: { type: String, required: false },
    c_oficina: { type: String, required: false },
    c_tipo_asenta: { type: String, required: false },
    c_mnpio: { type: String, required: false },
    id_asenta_cpcons: { type: String, required: false },
    d_zona: { type: String, required: false },
    c_cve_ciudad: { type: String, required: false },
}, {collection: 'cp'});
codigoPostalSchema.plugin(autoIncrement.plugin, { model: 'CodigoPostal', field: 'id' });
export const CodigoPostal = mongoose.model<ICodigoPostal>('CodigoPostal', codigoPostalSchema);
