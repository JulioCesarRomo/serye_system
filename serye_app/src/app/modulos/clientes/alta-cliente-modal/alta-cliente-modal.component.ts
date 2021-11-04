import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertasService} from "../../../nucleo/servicios/alertas.service";
import {UsuariosService} from "../../../nucleo/usuarios.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AutenticacionService} from "../../../nucleo/servicios/autenticacion.service";
import {CodigosPostalesService} from "../../../nucleo/servicios/codigosPostales.service";
import {FuncionesGeneralesService} from "../../../nucleo/servicios/funcionesGenerales.service";
import {NbDialogRef} from "@nebular/theme";
import {TiposDePersona} from "../../../compartido/enumeraciones/tipos-de-persona.enum";
import {Cliente} from "../../../compartido/modelos/cliente.model";
import {ExpresionesRegulares} from "../../../compartido/constantes/expresiones-regulares";
import {CodigoPostal} from "../../../compartido/modelos/codigoPostal.model";
import {SpinnerCargaCirculos} from "../../../compartido/constantes/globales";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-alta-cliente-modal',
  templateUrl: './alta-cliente-modal.component.html',
  styleUrls: ['./alta-cliente-modal.component.scss']
})
export class AltaClienteModalComponent implements OnInit {
  TiposDePersona = TiposDePersona;
  ExpresionesRegulares = ExpresionesRegulares;
  nuevoCliente: Cliente = new Cliente;

  codigosPostalesFacturacion: CodigoPostal[] = [];
  codigosPostalesEnvio: CodigoPostal[] = [];
  constructor(
    private detectorRef: ChangeDetectorRef,
    private _serAlertas: AlertasService,
    private _serUsuarios: UsuariosService,
    private _serSpinner: NgxSpinnerService,
    public _serAutenticacion: AutenticacionService,
    private _serCodigosPostales: CodigosPostalesService,
    public _serFuncionesGenerales: FuncionesGeneralesService,
    public referenciaDialogo: NbDialogRef<AltaClienteModalComponent>
  ) { }

  ngOnInit(): void {
  }
  filtrarCodigosPostalesDireccionEnvio(claveCodigoPostal: string){
    if(claveCodigoPostal.length == 5){
      this.nuevoCliente._idDireccionEnvio._idCodigoPostal = new CodigoPostal();
      this._serSpinner.show(undefined, SpinnerCargaCirculos);
      this._serCodigosPostales.filtrarCodigoPostal(claveCodigoPostal).subscribe(
        (codigosPostales: CodigoPostal[]) => {
          this.codigosPostalesEnvio = codigosPostales;
          this._serSpinner.hide();
        }, (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
      )
    }
  }
  filtrarCodigosPostalesDireccionFacturacion(claveCodigoPostal: string){
    if(claveCodigoPostal.length == 5){
      this.nuevoCliente._idDireccionFacturacion._idCodigoPostal = new CodigoPostal();
      this._serSpinner.show(undefined, SpinnerCargaCirculos);
      this._serCodigosPostales.filtrarCodigoPostal(claveCodigoPostal).subscribe(
        (codigosPostales: CodigoPostal[]) => {
          this.codigosPostalesFacturacion = codigosPostales;
          this._serSpinner.hide();
        }, (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
      )
    }
  }
}
