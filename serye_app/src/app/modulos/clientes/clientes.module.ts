import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ClientesComponent} from "./clientes.component";
import {ClientesRoutingModule} from "./clientes-routing.module";


@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
