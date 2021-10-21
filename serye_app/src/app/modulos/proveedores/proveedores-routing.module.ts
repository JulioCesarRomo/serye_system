import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProveedoresComponent} from "./proveedores.component";

export const proveedoresRutas: Routes = [
    {
        path:'',
        component: ProveedoresComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(proveedoresRutas)],
    exports: [RouterModule]
  })
  export class ProveedoresRoutingModule { }
