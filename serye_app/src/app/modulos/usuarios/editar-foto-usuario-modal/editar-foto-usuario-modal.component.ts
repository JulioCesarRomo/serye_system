import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {AlertasService} from "../../../nucleo/servicios/alertas.service";
import {UsuariosService} from "../../../nucleo/usuarios.service";
import {AutenticacionService} from "../../../nucleo/servicios/autenticacion.service";
import {NbDialogRef} from "@nebular/theme";
import {ImagenesService} from "../../../nucleo/servicios/imagenes.service";
import {SpinnerCargaCirculos} from "../../../compartido/constantes/globales";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-editar-foto-usuario-modal',
  templateUrl: './editar-foto-usuario-modal.component.html',
  styleUrls: ['./editar-foto-usuario-modal.component.scss']
})
export class EditarFotoUsuarioModalComponent implements OnInit {
  eventoCambioImagenFotografia: any = '';
  imagenFotoRecortada: any = '';
  fotoActual: string = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  //IMAGEN
  eventoCambioImagenLogotipo: any = '';
  imagenLogoRecortada: any = '';
  constructor(
      private _serAlertas: AlertasService,
      private _serImagenes: ImagenesService,
      private _serUsuarios: UsuariosService,
      private _serSpinner: NgxSpinnerService,
      private _serAutenticacion: AutenticacionService,
      public referenciaDialogo: NbDialogRef<EditarFotoUsuarioModalComponent>,
  ) { }

  ngOnInit(): void {
  }
  /*CROPPER*/
  cambioArchivoEventoLogo(event: any) {
    if (event.target.value == '') {
    } else {
      this.eventoCambioImagenLogotipo = event;
    }
  }
  cambioArchivoEvento(evento: any): void {
    this.eventoCambioImagenFotografia = evento;
  }
  imageLoaded() {}
  cropperReady() {}
  loadImageFailed() {}
  imagenCargada() {}
  cortadorListo() {}
  cargarImagenFallida() {}
  agregarImagen() {}
  imagenRecortada(evento: ImageCroppedEvent) {
    this.imagenLogoRecortada = evento.base64;
  }

  eliminarImagen(): void {
    this.imagenFotoRecortada = '';
    this.eventoCambioImagenFotografia = '';
  }

  async actualizarFotoPerfil() {
    await this._serSpinner.show(undefined, SpinnerCargaCirculos);
    const foto = new FormData();
    const fotografia = this._serImagenes.convertirImagen(this.imagenLogoRecortada, 1);
    foto.append('foto', fotografia);
    /*this._serUsuarios.actualizarFotografiaPerfilUsuario(await this.obtenerDatosAcceso(), foto).subscribe(
        async (nombreFotoPerfilActualizada: string) => {
          this._serSpinner.hide();
          this._serAlertas.exito('Completado', 'Se actualizó la foto de perfil', 3000);
          this.referenciaDialogo.close(nombreFotoPerfilActualizada);
        },
        (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
    );*/
  }
  obtenerDatosAcceso(){
    return new Promise<string>(resolve => {
      resolve(this._serAutenticacion.obtener_IdAccesoUsuario());
    })
  }
}
