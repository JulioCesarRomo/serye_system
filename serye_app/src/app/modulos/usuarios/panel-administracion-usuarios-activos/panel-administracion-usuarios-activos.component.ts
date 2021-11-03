import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from "ngx-spinner";
import {SpinnerCargaCirculos} from "../../../compartido/constantes/globales";
import {Router} from "@angular/router";
import {AlertasService} from "../../../nucleo/servicios/alertas.service";
import {EventosService} from "../../../nucleo/eventos.service";
import {UsuariosService} from "../../../nucleo/usuarios.service";
import {FuncionesGeneralesService} from "../../../nucleo/servicios/funcionesGenerales.service";
import {AutenticacionService} from "../../../nucleo/servicios/autenticacion.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {Usuario} from "../../../compartido/modelos/usuario.model";
import {PaginadorComponent} from "../../../compartido/componentes/paginador/paginador.component";
import {PaginadorMediano} from "../../../compartido/constantes/opciones-tamanio-paginador.constant";
import {Paginador} from "../../../compartido/modelos/paginador.model";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'app-panel-administracion-usuarios-activos',
  templateUrl: './panel-administracion-usuarios-activos.component.html',
  styleUrls: ['./panel-administracion-usuarios-activos.component.scss']
})
export class PanelAdministracionUsuariosActivosComponent implements OnInit {
  @ViewChild('paginador') paginador: PaginadorComponent;
  OpcionesTamanioPaginador = PaginadorMediano;
  dataSource: MatTableDataSource<Usuario>;
  columnasMostradas: string[] = ['nombreCompleto', 'usuario', 'correo', 'rfc', 'activo', 'opciones'];
  empleadoExpandido: Usuario | null;
  filtro: string = '';
  totalUsuarios: number = 0;
  //PARA CUANDO SE AGREGA UN NUEVO USUARIO
  subscripcionAgregarNuevoUsuario: Subscription;
  constructor(
      private router: Router,
      private dialog: MatDialog,
      private _serAlertas: AlertasService,
      private _serEventos: EventosService,
      private _serUsuarios: UsuariosService,
      private _serSpinner: NgxSpinnerService,
      public _serAutenticacion: AutenticacionService,
      public _serFuncionesGenerales: FuncionesGeneralesService
  ) { }

  ngOnInit(): void {
      this.obtenerUsuarios(0, 10);
      this.subscripcionAgregarNuevoUsuario = this._serEventos.obtenerUsuariosActivosEventoObservable$.subscribe(() => {
          console.log('OBTENIENDO USUARIOS NUEVAMENTE')
          this.obtenerUsuarios(0, 10);
      });
  }

  obtenerUsuarios(inicio: number, fin: number) {
    this._serSpinner.show(undefined, SpinnerCargaCirculos);
    this._serUsuarios.obtenerUsuariosFiltrados(this.filtro, inicio, fin, true).subscribe(
        (usuarios: Usuario[]) => {
          this._serSpinner.hide();
          this.obtenerNumUsuarios();
          this.inicializarTabla(usuarios);
        },
        (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
    );
  }

  obtenerNumUsuarios() {
    this._serUsuarios.obtenerNumUsuariosFiltrados(this.filtro, true).subscribe(
        (numUsuarios: number) => {
          this.totalUsuarios = numUsuarios;
        }
    );
  }

  inicializarTabla(empleados: Usuario[]) {
    this.dataSource = new MatTableDataSource<Usuario>(empleados);
  }

  buscarUsuario(): void {
    this._serEventos.reiniciarIndicePaginador();
    this.obtenerUsuarios(this.paginador.inicio, this.paginador.fin);
  }

  cambioDePaginaEventoPaginador(evento: Paginador) {
    this.obtenerUsuarios(evento.inicio, evento.fin);
  }

  actualizarEstadoEmpelado(empleadoActualizar: Usuario) {
    this._serAlertas.advertenciaConfirmacion(`Eliminar usuario`, `¿Estas seguro que deseas eliminar a ${empleadoActualizar.nombre} ${empleadoActualizar.apepat} ${(empleadoActualizar.apemat != null ? (' ' + empleadoActualizar.apemat) : '')} ?`,
        'Eliminar')
        .then((resultado) => {
          if (resultado.value) {
              this._serSpinner.show(undefined, SpinnerCargaCirculos);
            this._serUsuarios.actualizarEstadoUsuario(empleadoActualizar._id, false).subscribe(
                () => {
                  this._serSpinner.hide();
                  this.buscarUsuario();
                  this._serAlertas.exito('Completado', 'Usuario eliminado correctamente', 3000);
                },
                (err: HttpErrorResponse) => {
                  this._serSpinner.hide();
                  this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
                }
            );
          }
        })
  }

  abrirAltaAdministrarEmpleadoModal() {
    this.router.navigate(['/inicio/administracion-cuenta/usuarios/alta'])
    // this.modal.open(AltaAdministracionUsuariosAdministracionCuentaComponent, {
    //   disableClose: true
    // })
    //   .afterClosed()
    //   .subscribe(empleado => {
    //     if (empleado) {
    //       this.buscarEmpleado();
    //     }
    //   })
  }

  abrirInformacionGeneralAdministrarEmpleadoModal(empleado: Usuario) {
    /*this.dialog.open(ActualizacionInformacionGeneralAdministracionUsuariosAdministracionCuentaModalComponent, {
      data: empleado,
      disableClose: true
    })
        .afterClosed()
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this._serAlertas.exito('Empelado actualizado con exito', 'La información general del empleado ha sido actualizada exitosamente', 3000);
          }
        });*/
  }

  abrirDireccionAdministrarEmpleadoModal(empleado: Usuario) {
    /*this.dialog.open(ActualizacionDireccionAdministracionUsuariosAdministracionCuentaModalComponent, {
      data: empleado,
      disableClose: true
    })
        .afterClosed()
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this._serAlertas.exito('Empelado actualizado con exito', 'La dirección del empleado ha sido actualizada exitosamente', 3000);
          }
        });*/
  }

  abrirContactoAdministrarEmpleadoModal(empleado: Usuario) {
    /*this.dialog.open(ActualizacionContactoAdministracionUsuariosAdministracionCuentaModalComponent, {
      data: empleado,
      disableClose: true
    })
        .afterClosed()
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this._serAlertas.exito('Empelado actualizado con exito', 'La información de contacto del empleado ha sido actualizada exitosamente', 3000);
          }
        });*/
  }

  abrirPermisosAdministrarEmpleadoModal(empleado: Usuario) {
    /*this.dialog.open(ActualizacionPermisosAdministracionUsuariosAdministracionCuentaModalComponent, {
      width: '90%',
      data: empleado,
      disableClose: true
    })
        .afterClosed()
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this._serAlertas.exito('Empleado actualizado con exito', 'Los permisos del empleado han sido actualizados exitosamente', 3000);
          }
        });*/
  }
  abrirHorariosAdministrarEmpleadoModal(empleado: Usuario) {
    /*this.dialog.open(ActualizacionHorariosAdministracionUsuariosAdministracionCuentaModalComponent, {
      data: empleado,
      disableClose: true
    })
        .afterClosed()
        .subscribe((resultado: boolean) => {
          if (resultado) this._serAlertas.exito('Empleado actualizado con exito', 'Los horarios del empleado han sido actualizados exitosamente', 3000);
        })*/
  }

  abrirFotoAdministrarEmpleadoModal(empleado: Usuario) {
    /*this.dialog.open(ActualizacionFotoAdministracionUsuariosAdministracionCuentaModalComponent, {
      width: '50%',
      data: empleado,
      disableClose: true
    })
        .afterClosed()
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this._serAlertas.exito('Empelado actualizado con exito', 'La fotografía del empleado ha sido actualizada exitosamente', 3000);
          }
        });*/
  }

  abrirVistaEmpleadoModal(empleado: Usuario) {
    /*this.dialog.open(VistaUsuarioAdministracionCuentaComponent, {
      width: '80%',
      data: empleado,
      disableClose: true
    });*/
  }
}
