import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ProveedoresComponent} from "./proveedores.component";
import {ProveedoresRoutingModule} from "./proveedores-routing.module";


@NgModule({
  declarations: [
    ProveedoresComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule
  ]
})
export class ProveedoresModule { }
