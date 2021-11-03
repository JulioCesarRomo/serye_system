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
import * as CryptoJS from 'crypto-js';
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
  contrasena: string = '';
  auxContrasena: string = '';
  contrasenasIguales: boolean;
  contrasenaEncriptada: string = '';

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
      public referenciaDialogo: NbDialogRef<AltaUsuarioModalComponent>
  ) { }

  ngOnInit(): void {
  }
  imprimir(){
    console.log(this.nuevoUsuario.agregarDireccion)
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
  //VALIDAR QUE LAS CONTRASEÑAS SEAN IGUALES
  validarContrasenas(){
    if(this.contrasena === this.auxContrasena) {
      this.contrasenasIguales = true;
      this.contrasenaEncriptada = CryptoJS.SHA256(this.contrasena).toString(CryptoJS.enc.Hex);
    } else {
      this.contrasenasIguales = false;
    }
  }

  //SEGUNDO STEP: Dirección
  filtrarCodigosPostales(claveCodigoPostal: string){
    if(claveCodigoPostal.length == 5){
      this.nuevoUsuario._idCodigoPostal = new CodigoPostal();
      this._serSpinner.show(undefined, SpinnerCargaCirculos);
      this._serCodigosPostales.filtrarCodigoPostal(claveCodigoPostal).subscribe(
          (codigosPostales: CodigoPostal[]) => {
            this.codigosPostales = codigosPostales;
            this._serSpinner.hide();
          }, (err: HttpErrorResponse) => {
            this._serSpinner.hide();
            this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
          }
      )
    }
  }
  //AGREGAR NUEVO USUARIO
  /* METODOS PARA GUARDAR LOS DATOS DEL USUARIO */
  guardarNuevoUsuario(): void {
    this._serSpinner.show(undefined, SpinnerCargaCirculos);
    /*if (this.imagenFotoRecortada == '') {
      this.usuarioNuevo.rutaFoto = AjustesAplicacion.RutasDefault.foto.rutaFoto;
      this.usuarioNuevo.nombreFoto = AjustesAplicacion.RutasDefault.foto.nombreFoto;
    }*/
    this._serUsuarios.guardarUsuario(this.prepararDatosUsuario()).subscribe(
        (usuario: Usuario) => {
          this._serSpinner.hide();
          /*if (this.imagenFotoRecortada !== '') {
            const foto = new FormData();
            const fotografia = this._serImagenes.convertirImagen(this.imagenFotoRecortada, 0);
            foto.append('foto', fotografia);
            this.guardarFotografiaUsuario(usuario._id, foto);
          }*/
          this._serAlertas.exito('Usuario guardado con éxito', `Se ha creado exitosamente el usuario ${usuario.usuario}`, 3000)
          this.referenciaDialogo.close(usuario);
        },
        (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
    );
  }
  prepararDatosUsuario(): Usuario {
    let usuario = new Usuario();
    usuario.tipo = this.nuevoUsuario.tipo;
    usuario.usuario = this.nuevoUsuario.usuario;
    usuario.nombre = this.nuevoUsuario.nombre;
    usuario.apepat = this.nuevoUsuario.apepat;
    usuario.apemat = this.nuevoUsuario.apemat;
    usuario.agregarDireccion = this.nuevoUsuario.agregarDireccion;
    usuario.telefono = this.nuevoUsuario.telefono;
    if (usuario.agregarDireccion) {
      usuario._idCodigoPostal = this.nuevoUsuario._idCodigoPostal;
      usuario.calle = this.nuevoUsuario.calle;
      usuario.numeroExterior = this.nuevoUsuario.numeroExterior;
      if(isNotNullOrUndefined(usuario.numeroInterior)) usuario.numeroInterior = this.nuevoUsuario.numeroInterior;
    }
    usuario.correo = this.nuevoUsuario.correo;
    usuario.contrasenas.push({
      contrasena: this.contrasenaEncriptada,
      fechaRegistro: new Date(Date.now()),
      activo: true
    })
    return usuario;
  }
}
