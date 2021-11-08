import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertasService} from "../../../nucleo/servicios/alertas.service";
import {UsuariosService} from "../../../nucleo/usuarios.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AutenticacionService} from "../../../nucleo/servicios/autenticacion.service";
import {CodigosPostalesService} from "../../../nucleo/servicios/codigosPostales.service";
import {FuncionesGeneralesService} from "../../../nucleo/servicios/funcionesGenerales.service";
import {NbDialogRef, NbTagComponent} from "@nebular/theme";
import {TiposDePersona} from "../../../compartido/enumeraciones/tipos-de-persona.enum";
import {Cliente} from "../../../compartido/modelos/cliente.model";
import {ExpresionesRegulares} from "../../../compartido/constantes/expresiones-regulares";
import {CodigoPostal} from "../../../compartido/modelos/codigoPostal.model";
import {SpinnerCargaCirculos} from "../../../compartido/constantes/globales";
import {HttpErrorResponse} from "@angular/common/http";
import {Usuario} from "../../../compartido/modelos/usuario.model";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {ClientesService} from "../../../nucleo/servicios/clientes.service";

@Component({
  selector: 'app-alta-cliente-modal',
  templateUrl: './alta-cliente-modal.component.html',
  styleUrls: ['./alta-cliente-modal.component.scss']
})
export class AltaClienteModalComponent implements OnInit {
  TiposDePersona = TiposDePersona;
  ExpresionesRegulares = ExpresionesRegulares;
  nuevoCliente: Cliente = new Cliente;

  auxTelefono: string = '';

  codigosPostalesFacturacion: CodigoPostal[] = [];
  codigosPostalesEnvio: CodigoPostal[] = [];
  constructor(
    private detectorRef: ChangeDetectorRef,
    private _serAlertas: AlertasService,
    private _serClientes: ClientesService,
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
  eliminarTelefono(telefonoPorEliminar: NbTagComponent): void {
    this.nuevoCliente.telefonos = this.nuevoCliente.telefonos.filter(t => t !== telefonoPorEliminar.text);
  }
  //AGREGAR NUEVO CLIENTE
  /* METODOS PARA GUARDAR LOS DATOS DEL NUEVO CLIENTE */
  guardarNuevoCliente(): void {
    this._serSpinner.show(undefined, SpinnerCargaCirculos);
    /*if (this.imagenFotoRecortada == '') {
      this.usuarioNuevo.rutaFoto = AjustesAplicacion.RutasDefault.foto.rutaFoto;
      this.usuarioNuevo.nombreFoto = AjustesAplicacion.RutasDefault.foto.nombreFoto;
    }*/
    this._serClientes.guardarCliente(this.prepararDatosCliente()).subscribe(
      (cliente: Cliente) => {
        this._serSpinner.hide();
        /*if (this.imagenFotoRecortada !== '') {
          const foto = new FormData();
          const fotografia = this._serImagenes.convertirImagen(this.imagenFotoRecortada, 0);
          foto.append('foto', fotografia);
          this.guardarFotografiaUsuario(usuario._id, foto);
        }*/
        this._serAlertas.exito('Cliente guardado con éxito', `Se ha creado exitosamente el cliente ${this._serFuncionesGenerales.obtenerNombreRazonSocialCliente(cliente)}`, 3000)
        this.referenciaDialogo.close(cliente);
      },
      (err: HttpErrorResponse) => {
        this._serSpinner.hide();
        this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
      }
    );
  }
  prepararDatosCliente(): Cliente {
    let cliente = new Cliente();
    cliente.tipoDePersona = this.nuevoCliente.tipoDePersona;
    cliente.nombre = this.nuevoCliente.nombre;
    cliente.apepat = this.nuevoCliente.apepat;
    cliente.apemat = this.nuevoCliente.apemat;
    cliente.correo = this.nuevoCliente.correo;
    cliente.agregarRepresentante = this.nuevoCliente.agregarRepresentante;
    cliente.agregarDireccionEnvio = this.nuevoCliente.agregarDireccionEnvio;
    cliente.agregarDireccionFacturacion = this.nuevoCliente.agregarDireccionFacturacion;
    if (this.nuevoCliente.telefonos.length != 0) cliente.telefonos = this.nuevoCliente.telefonos;
    if (cliente.agregarRepresentante) {
      cliente.nombreRepresentante = this.nuevoCliente.nombreRepresentante;
      cliente.apepatRepresentante = this.nuevoCliente.apepatRepresentante;
      cliente.apematRepresentante = this.nuevoCliente.apematRepresentante;
    }
    if (cliente.agregarDireccionEnvio) {
      cliente._idDireccionEnvio._idCodigoPostal = this.nuevoCliente._idDireccionEnvio._idCodigoPostal;
      cliente._idDireccionEnvio.calle = this.nuevoCliente._idDireccionEnvio.calle;
      cliente._idDireccionEnvio.numeroExterior = this.nuevoCliente._idDireccionEnvio.numeroExterior;
      if(isNotNullOrUndefined(cliente._idDireccionEnvio.numeroInterior)) cliente._idDireccionEnvio.numeroInterior = this.nuevoCliente._idDireccionEnvio.numeroInterior;
    }
    if (cliente.agregarDireccionFacturacion) {
      cliente._idDireccionFacturacion._idCodigoPostal = this.nuevoCliente._idDireccionFacturacion._idCodigoPostal;
      cliente._idDireccionFacturacion.calle = this.nuevoCliente._idDireccionFacturacion.calle;
      cliente._idDireccionFacturacion.numeroExterior = this.nuevoCliente._idDireccionFacturacion.numeroExterior;
      if(isNotNullOrUndefined(cliente._idDireccionFacturacion.numeroInterior)) cliente._idDireccionFacturacion.numeroInterior = this.nuevoCliente._idDireccionFacturacion.numeroInterior;
    }
    return cliente;
  }
}
