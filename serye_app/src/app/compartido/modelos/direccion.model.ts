import {Usuario} from "./usuario.model";

export class Direccion {
  _id?: string;
  tipo: number;
  default: boolean;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  _idCodigoPostal: CodigoPostal | string;
  _idUsuario?: Usuario | string;
  constructor() {
    this._idCodigoPostal = new CodigoPostal();
  }
}
