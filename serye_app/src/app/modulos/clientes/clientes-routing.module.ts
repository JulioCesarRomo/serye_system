import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientesComponent} from "./clientes.component";

export const clientesRutas: Routes = [
    {
        path:'',
        component: ClientesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(clientesRutas)],
    exports: [RouterModule]
  })
  export class ClientesRoutingModule { }
