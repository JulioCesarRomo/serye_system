import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from '../../compartido/constantes/ajustes-aplicacion';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpClient: HttpClient) { }

  public obtenerCategorias(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/', AjustesAplicacion.Opciones);
  }
  public obtenerMarcasPorCategorias(_idCategoria: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `categorias/marcas-por-categoria?_idCategoria=${_idCategoria}`, AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasCorreoContacto(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/correo-contacto', AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasRaiz(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/raiz', AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasSeccionadas(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/obtener-categorias-seccionadas', AjustesAplicacion.Opciones);
  }
  public obtenerPaqueterias(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/obtener-paqueterias', AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasPorParent(parent: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/obtener-categorias-por-parent?parent=' + parent, AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasAutos(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/obtener-categorias-autos', AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasAutosAgrupadasPorMarca(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/obtener-categorias-autos-agrupadas-marca', AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasAutosFiltradasPorMarca(marca: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/obtener-categorias-autos-filtradas-marca?marca=' + marca, AjustesAplicacion.Opciones);
  }
  public obtenerCategoriasAutosFiltradasPorMarcaModelo(marca: string, modelo: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'categorias/obtener-categorias-autos-filtradas-marca-modelo?marca=' + marca + '&modelo=' + modelo, AjustesAplicacion.Opciones);
  }
}
