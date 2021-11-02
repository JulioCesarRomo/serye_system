import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from '../../compartido/constantes/ajustes-aplicacion';

@Injectable({
  providedIn: 'root'
})
export class CodigosPostalesService {

  constructor(private httpClient: HttpClient) { }

  public obtenerClavesCodigosPostales(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'codigos-postales/obtener-claves-codigos-postales', AjustesAplicacion.Opciones);
  }
  public filtrarCodigoPostal(clave: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `codigos-postales/filtrar-codigos-postales-por-clave?clave=${clave}`, AjustesAplicacion.Opciones);
  }
  public obtenerCodigoPostal(_idCodigoPostal: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + `codigos-postales/obtener-codigo-postal?id=${_idCodigoPostal}`, AjustesAplicacion.Opciones);
  }
}
