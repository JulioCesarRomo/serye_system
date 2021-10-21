import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuariosComponent} from "./usuarios.component";

export const usuariosRutas: Routes = [
    {
        path:'',
        component: UsuariosComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(usuariosRutas)],
    exports: [RouterModule]
  })
  export class UsuariosRoutingModule { }
