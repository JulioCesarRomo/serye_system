import { Component, OnInit } from '@angular/core';
import {ExpresionesRegulares} from "../../constantes/expresiones-regulares";
import {NgxSpinnerService} from "ngx-spinner";
import {SpinnerCargaCirculos} from "../../constantes/globales";
import {AutenticacionService} from "../../../nucleo/servicios/autenticacion.service";
import {AlertasService} from "../../../nucleo/servicios/alertas.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
class Login {
  correoUsuario = '';
  contrasena: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  ExpresionesRegulares = ExpresionesRegulares;
  constructor(
      private router: Router,
      private _serAlertas: AlertasService,
      private _serSpinner: NgxSpinnerService,
      private _serAutenticacion: AutenticacionService
  ) {
  }

  ngOnInit(): void {
  }
  verificarIniciarSesionConCorreo(correo_usuario: string){
    return correo_usuario.includes('@');
  }
  iniciarSesionUsuario() {
    this._serSpinner.show(undefined, SpinnerCargaCirculos);
    this._serAutenticacion.iniciarSesionUsuario(this.login).subscribe(
        (token: string) => {
          this._serSpinner.hide();
          const datosUsuario = this._serAutenticacion.obtenerTokenDesencriptado();
          /*localStorage.setItem('tema-actual', datosUsuario.personalizacion._idTemaDeColores.tema);*/
          /*this._serWebSockets.iniciarSesionWS(UsuarioSocket.prototype.nuevoUsuario(datosUsuario._id, true, datosUsuario.tipo, '', '', this._serAutenticacion.obtener_IdAccesoUsuario()))
              .then(() => {*/
                this.router.navigate(['/inicio/dashboard']);
                this._serAlertas.exito('Bienvenido ', '', 3000);
              /*})*/
        },
        (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
    );
  }
}
