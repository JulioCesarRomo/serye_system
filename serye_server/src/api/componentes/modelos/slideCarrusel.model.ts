import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';

mongoose.set('useUnifiedTopology', true);
const conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface ISlideCarrusel extends Document {
    id: number;
    idOrden: number;
    nombre: string;
    nombreImagen: string;
    titulo: string;
    subtitulo: string;
    /*textoBoton: string;
    colorTitulo: string;
    colorSubtitulo: string;
    colorBoton: string;
    colorTextoBoton: string;
    tipoRedireccion: number;
    estado: boolean;
    linkRedideccion?: string;
    _idProducto: IProducto['_id'];
    _idCategoria: ICategoria['_id'];
    _idAcceso: IAcceso['_id'];
    fechaActivacion: Date;
    fechaDesactivacion: Date;*/
    activo: boolean;
    fechaRegistro: Date;
}
const slideCarruselSchema = new Schema({
    id: { type: Number, required: false },
    idOrden: { type: Number, required: false },
    nombre: { type: String, required: true },
    nombreImagen: { type: String, required: false },
    titulo: { type: String, required: false },
    subtitulo: { type: String, required: false },
    /*textoBoton: { type: String, required: false },
    colorTitulo: { type: String, required: false },
    colorSubtitulo: { type: String, required: false },
    colorBoton: { type: String, required: false },
    colorTextoBoton: { type: String, required: false },
    tipoRedireccion: { type: Number, required: true },
    estadoActual: { type: Boolean, required: false },
    linkRedideccion: { type: String, required: false },
    _idProducto: { type: Schema.Types.ObjectId, ref: 'Producto', required: false },
    _idCategoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: false},
    _idAcceso: { type: Schema.Types.ObjectId, ref: 'Acceso', required: [true, 'Por favor, ingresa el campo Acceso'] },
    fechaActivacion: { type: Date, required: true },
    fechaDesactivacion: { type: Date, required: false },*/
    activo: { type: Boolean, required: true },
    fechaRegistro: { type: Date, required: true },
});
slideCarruselSchema.plugin(autoIncrement.plugin, { model: 'SlideCarrusel', field: 'id' });
export const SlideCarrusel = mongoose.model<ISlideCarrusel>('SlideCarrusel', slideCarruselSchema);
