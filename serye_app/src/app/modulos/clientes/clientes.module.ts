import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ClientesComponent} from "./clientes.component";
import {ClientesRoutingModule} from "./clientes-routing.module";
import { AltaClienteModalComponent } from './alta-cliente-modal/alta-cliente-modal.component';
import { PanelAdministracionClientesActivosComponent } from './panel-administracion-clientes-activos/panel-administracion-clientes-activos.component';
import { PanelAdministracionClientesInactivosComponent } from './panel-administracion-clientes-inactivos/panel-administracion-clientes-inactivos.component';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule, NbFormFieldModule,
  NbIconModule,
  NbInputModule, NbSelectModule, NbStepperModule,
  NbTabsetModule, NbTagModule, NbToggleModule
} from "@nebular/theme";
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule} from "@angular/forms";
import {DirectivasModule} from "../../compartido/directivas/directivas.module";


@NgModule({
  declarations: [
    ClientesComponent,
    AltaClienteModalComponent,
    PanelAdministracionClientesActivosComponent,
    PanelAdministracionClientesInactivosComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    NbCardModule,
    NbTabsetModule,
    NbIconModule,
    NbButtonModule,
    NgxSpinnerModule,
    FormsModule,
    NbButtonGroupModule,
    NbInputModule,
    NbStepperModule,
    NbFormFieldModule,
    NbToggleModule,
    NbSelectModule,
    DirectivasModule,
    NbTagModule
  ]
})
export class ClientesModule { }
