import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';
import {ICodigoPostal} from "./codigoPostal.model";
import {IUsuario} from "./usuario.model";
import {TiposDeDireccion} from "../../enumeraciones/tipos-de-direccion.enum";


mongoose.set('useUnifiedTopology', true);
var conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface IDireccion extends Document {
    tipo: number;
    default: boolean;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    _idCodigoPostal: ICodigoPostal['_id'];
    _idUsuario: IUsuario['_id'];
}

const direccionSchema = new Schema({
    tipo: { type: Number, required: true, default: TiposDeDireccion.Personal },
    default: { type: Boolean, required: true, default: false },
    calle: { type: String, required: true },
    numeroExterior: { type: String, required: true },
    numeroInterior: { type: String, required: false },
    _idCodigoPostal: { type: Schema.Types.ObjectId, ref:'CodigoPostal' },
    _idUsuario: { type: Schema.Types.ObjectId, ref:'Usuario' },
});

direccionSchema.plugin(autoIncrement.plugin, { model: 'Direccion', field: 'id' });

export const Direccion = mongoose.model<IDireccion>('Direccion', direccionSchema);
