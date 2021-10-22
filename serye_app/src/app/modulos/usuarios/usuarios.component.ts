import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AltaUsuarioModalComponent} from './alta-usuario-modal/alta-usuario-modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(
      private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  /*** ABRIR MODAL PARA ALTA DE NUEVO USUARIO ***/
  abrirAltaUsuarioModal(): void{
    const referenciaModal = this.dialog.open(AltaUsuarioModalComponent, {
      disableClose: true
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
