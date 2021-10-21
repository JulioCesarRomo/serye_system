import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() {}

  exito(titulo: string, detalles: string, tiempo: number) {
    Swal.fire({
      title: titulo,
      html: detalles,
      timer: tiempo,
      icon: 'success',
    });
  }
  exitoPequeno(titulo: string, tiempo: number) {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: tiempo
    });
  }
  error(titulo: string, detalles: string, tiempo: number) {
    Swal.fire({
      title: titulo,
      html: detalles,
      timer: tiempo,
      icon: 'error',
    });
  }
  info(titulo: string, detalles: string, tiempo: number) {
    Swal.fire({
      title: titulo,
      html: detalles,
      timer: tiempo,
      icon: 'info',
    });
  }
  infoPequeno(titulo: string, tiempo: number) {
    Swal.fire({
      position: 'top',
      icon: 'info',
      title: titulo,
      showConfirmButton: false,
      timer: tiempo
    });
  }
  advertencia(titulo: string, detalles: string, tiempo: number) {
    Swal.fire({
      title: titulo,
      html: detalles,
      timer: tiempo,
      icon: 'warning',
    });
  }
  advertenciaConfirmacion(titulo: string, detalles: string, textoBotonConfirmar: string) {
    return Swal.fire({
      title: titulo,
      text: detalles,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: textoBotonConfirmar,
      cancelButtonText: 'Cancelar',
    });
  }
  exitoConfirmacion(titulo: string, detalles: string, textoBotonConfirmar: string) {
    return Swal.fire({
      title: titulo,
      text: detalles,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: textoBotonConfirmar,
      cancelButtonText: 'Cancelar',
    });
  }
}
