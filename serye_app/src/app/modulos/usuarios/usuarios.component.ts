import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AltaUsuarioModalComponent} from './alta-usuario-modal/alta-usuario-modal.component';
import {NbDialogService, NbWindowService} from "@nebular/theme";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(
      private dialogService: NbDialogService,
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
        });
    /*referenciaModal.afterClosed().subscribe(async empleado => {
      if (empleado) {
        this._serEventos.reiniciarIndicePaginador();
        this.obtenerEmpleados(this.paginador.inicio, this.paginador.fin);
        this._serEventos.obtenerNuevoNumeroElementos(true);
      }
    });*/
  }
}
