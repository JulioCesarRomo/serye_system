import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

export const dashboardRutas: Routes = [
    {
        path:'',
        component: DashboardComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(dashboardRutas)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
