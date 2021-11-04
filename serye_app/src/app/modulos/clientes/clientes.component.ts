import { Component, OnInit } from '@angular/core';
import {AltaUsuarioModalComponent} from "../usuarios/alta-usuario-modal/alta-usuario-modal.component";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {EventosService} from "../../nucleo/eventos.service";
import {NbDialogService} from "@nebular/theme";
import {AltaClienteModalComponent} from "./alta-cliente-modal/alta-cliente-modal.component";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(
    private _serEventos: EventosService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
  }
  /*** ABRIR MODAL PARA ALTA DE NUEVO CLIENTE ***/
  abrirAltaUsuarioModal(): void{
    this.dialogService.open(
      AltaClienteModalComponent,
      {
        context: 'this is some additional data passed to dialog',
        closeOnBackdropClick: false,
        closeOnEsc: false
      }).onClose.subscribe(nuevoUsuario => {
      if(isNotNullOrUndefined(nuevoUsuario)) this._serEventos.agregarNuevoUsuario();
    });
  }
}
