import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {UsuariosComponent} from "./usuarios.component";
import {UsuariosRoutingModule} from "./usuarios-routing.module";
import {NbCardModule, NbTabsetModule} from "@nebular/theme";
import { PanelAdministracionUsuariosActivosComponent } from './panel-administracion-usuarios-activos/panel-administracion-usuarios-activos.component';
import { PanelAdministracionUsuariosInactivosComponent } from './panel-administracion-usuarios-inactivos/panel-administracion-usuarios-inactivos.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    UsuariosComponent,
    PanelAdministracionUsuariosActivosComponent,
    PanelAdministracionUsuariosInactivosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NbCardModule,
    NbTabsetModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatInputModule
  ]
})
export class UsuariosModule { }
