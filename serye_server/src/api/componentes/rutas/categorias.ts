import { Router } from 'express';
import * as CategoriasCtrl from '../controladores/categorias';

const categoriasRutas = Router();


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   G  E  T   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
categoriasRutas.get('/', CategoriasCtrl.obtenerCategorias);
categoriasRutas.get('/marcas-por-categoria', CategoriasCtrl.obtenerMarcasPorCategoria);
categoriasRutas.get('/correo-contacto', CategoriasCtrl.obtenerCategoriasCorreoContacto);
/*categoriasRutas.get('/obtener-categorias-seccionadas', CategoriasCtrl.obtenerCategoriasSeccionadas);
categoriasRutas.get('/obtener-categorias-por-parent', CategoriasCtrl.obtenerCategoriasPorParent);*/
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * P  O  S  T * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   P  U  T   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  P  A  T  C  H  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  D  E  L  E  T  E  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

export default categoriasRutas;
