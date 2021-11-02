import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormGroup} from "@angular/forms";
import {TiposUsuario} from "../../../compartido/enumeraciones/tipos-usuario.enum";
import {TiposDePersona} from "../../../compartido/enumeraciones/tipos-de-persona.enum";
import {BehaviorSubject} from "rxjs";
import {ExpresionesRegulares} from "../../../compartido/constantes/expresiones-regulares";
import {Usuario} from "../../../compartido/modelos/usuario.model";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {UsuariosService} from "../../../nucleo/usuarios.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertasService} from "../../../nucleo/servicios/alertas.service";
import {AutenticacionService} from "../../../nucleo/servicios/autenticacion.service";
import {FuncionesGeneralesService} from "../../../nucleo/servicios/funcionesGenerales.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CodigosPostalesService} from "../../../nucleo/servicios/codigosPostales.service";
import {SpinnerCargaCirculos} from "../../../compartido/constantes/globales";
import {CodigoPostal} from "../../../compartido/modelos/codigoPostal.model";
@Component({
  selector: 'app-alta-usuario-modal',
  templateUrl: './alta-usuario-modal.component.html',
  styleUrls: ['./alta-usuario-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AltaUsuarioModalComponent implements OnInit {
  @Input() title: string;
  ExpresionesRegulares = ExpresionesRegulares;
  nuevoUsuario: Usuario = new Usuario();

  @ViewChild('nuevoUsuarioForm') infoGeneralForm: FormGroup;
  TiposUsuario = TiposUsuario;
  TiposDePersona = TiposDePersona;
  contadorPeticionesNombreUsuarioExistente: number;
  nombreUsuarioExistente = new BehaviorSubject(true);

  codigosPostales: CodigoPostal[] = [];
  constructor(
      private detectorRef: ChangeDetectorRef,
      private _serAlertas: AlertasService,
      private _serUsuarios: UsuariosService,
      private _serSpinner: NgxSpinnerService,
      public _serAutenticacion: AutenticacionService,
      private _serCodigosPostales: CodigosPostalesService,
      public _serFuncionesGenerales: FuncionesGeneralesService,
      protected ref: NbDialogRef<AltaUsuarioModalComponent>
  ) { }

  ngOnInit(): void {
  }
  imprimir(value){
    console.log(value)
  }
  //Validar si el nombre de usuario ya existe
  existeNombreUsuario(): void {
    if (isNotNullOrUndefined(this.nuevoUsuario.usuario)) {
      this.contadorPeticionesNombreUsuarioExistente++;
      this._serUsuarios.existeNombreUsuario(this.nuevoUsuario.usuario).subscribe(
          (respuesta: { existe: boolean }) => {
            this.contadorPeticionesNombreUsuarioExistente--;
            this.nombreUsuarioExistente.next(respuesta.existe);
            this.infoGeneralForm.controls['usuario'].updateValueAndValidity();
          },
          (err: HttpErrorResponse) => {
            this.nombreUsuarioExistente.next(true);
            this.infoGeneralForm.controls['usuario'].updateValueAndValidity();
            this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
          }
      );
    }
  }
  actualizarTipoDeUsuario(value): void {
    console.log(value)
    this.nuevoUsuario.tipo = value;
    this.detectorRef.markForCheck();
  }
  convertirRfcMayusculas(): void {
    if (this.nuevoUsuario.rfc) {
      this.nuevoUsuario.rfc = this.nuevoUsuario.rfc.toUpperCase();
    }
  }
  //SEGUNDO STEP: Dirección
  filtrarCodigosPostales(claveCodigoPostal: string){
    this._serSpinner.show(undefined, SpinnerCargaCirculos);
    this._serCodigosPostales.filtrarCodigoPostal(claveCodigoPostal).subscribe(
      (codigosPostales: CodigoPostal[]) => {
        this.codigosPostales = codigosPostales;
        this._serSpinner.hide();
      }, (err: HttpErrorResponse) => {
        this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
      }
    )
  }
}
