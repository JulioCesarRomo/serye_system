import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {UsuariosComponent} from "./usuarios.component";
import {UsuariosRoutingModule} from "./usuarios-routing.module";
import {NbCardModule, NbInputModule, NbTabsetModule} from "@nebular/theme";
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
import { AltaUsuarioModalComponent } from './alta-usuario-modal/alta-usuario-modal.component';
import {PaginadorModule} from "../../compartido/componentes/paginador/paginador.module";
import {MatSortModule} from "@angular/material/sort";
import {AlertaModule} from "../../compartido/alerta/alerta.module";
import {MatDialogModule} from "@angular/material/dialog";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    UsuariosComponent,
    PanelAdministracionUsuariosActivosComponent,
    PanelAdministracionUsuariosInactivosComponent,
    AltaUsuarioModalComponent
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
        MatInputModule,
        PaginadorModule,
        MatSortModule,
        AlertaModule,
        MatDialogModule,
        FlexModule,
        NbInputModule
    ]
})
export class UsuariosModule { }
