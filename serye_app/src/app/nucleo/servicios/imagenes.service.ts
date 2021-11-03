import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from '../../compartido/constantes/ajustes-aplicacion';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private httpClient: HttpClient) { }

  public convertirImagen(imagen: string, tipo: number) {
    const fecha: string = moment(new Date(Date.now())).format('DD-MM-YYYY[_]hh-mm-ss');
    let nombreImagen: string = '';
    const imagenBlob = this.datosURIaBlob(imagen, tipo);
    if (tipo == 0) {
      nombreImagen = 'imagen_' + fecha + '.jpg';
      return new File([imagenBlob], nombreImagen, { type: 'image/jpg' })
    }
    else {
      nombreImagen = 'imagen_' + fecha + '.png';
      return new File([imagenBlob], nombreImagen, { type: 'image/png' })
    }
  }
  public convertirImagenComprobante(imagen: string, tipo: number) {
    const fecha: string = moment(new Date(Date.now())).format('DD-MM-YYYY[_]hh-mm-ss');
    let nombreImagen: string = '';
    const imagenBlob = this.datosURIaBlob(imagen, tipo);
    if (tipo == 0) {
      nombreImagen = 'comprobante_' + fecha + '.jpg';
      return new File([imagenBlob], nombreImagen, { type: 'image/jpg' })
    }
    else {
      nombreImagen = 'comprobante_' + fecha + '.png';
      return new File([imagenBlob], nombreImagen, { type: 'image/png' })
    }
  }
  public convertirImagenProducto(imagen: string, idProducto: string, contador:string,  tipo: number) {
    let nombreImagen: string = '';
    const imagenBlob = this.datosURIaBlob(imagen, tipo);
    if (tipo == 0) {
      nombreImagen = idProducto + '_' + contador + '.jpg';
      return new File([imagenBlob], nombreImagen, { type: 'image/jpg' })
    }
    else {
      nombreImagen = idProducto + '_' + contador + '.png';
      return new File([imagenBlob], nombreImagen, { type: 'image/png' })
    }
  }
  private datosURIaBlob(datosURI: string, tipo: number): any {
    const base64 = datosURI.slice(22, -22);
    const stringByte = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(stringByte.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < stringByte.length; i++) {
      int8Array[i] = stringByte.charCodeAt(i);
    }
    return tipo == 0 ? new Blob([int8Array], { type: 'image/jpg' }) : new Blob([int8Array], { type: 'image/png' });
  }
  public comprimir(imagen: File): Observable<any> {
    const width: number = 600;
    const reader = new FileReader();
    reader.readAsDataURL(imagen);
    return Observable.create(observer => {
      reader.onload = ev => {
        const img = new Image();
        img.src = (ev.target as any).result;
        (img.onload = () => {
          const elem = document.createElement('canvas');
          const scaleFactor = width / img.width;
          elem.width = width;
          elem.height = img.height * scaleFactor;
          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
          ctx.canvas.toBlob(
            blob => {
              observer.next(
                new File([blob], imagen.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                })
              )
            },
            'image/jpeg',
            0.4
          )
        }),
          (reader.onerror = error => observer.error(error));
      }
    })
  }
}
