import { Component, OnInit } from '@angular/core';
import {AltaUsuarioModalComponent} from './alta-usuario-modal/alta-usuario-modal.component';
import {NbDialogService} from "@nebular/theme";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {EventosService} from "../../nucleo/eventos.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(
      private _serEventos: EventosService,
      private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
  }
  /*** ABRIR MODAL PARA ALTA DE NUEVO USUARIO ***/
  abrirAltaUsuarioModal(): void{
    this.dialogService.open(
        AltaUsuarioModalComponent,
        {
          context: 'this is some additional data passed to dialog',
          closeOnBackdropClick: false,
          closeOnEsc: false
        }).onClose.subscribe(nuevoUsuario => {
            if(isNotNullOrUndefined(nuevoUsuario)) this._serEventos.agregarNuevoUsuario();
    });
  }
}
