export class Categoria {
    _id?: string;
    nombre?: string;
    nombreImagen?: string;
    categorias?: Categoria[];
    constructor() {
      this.categorias = [];
    }
}
