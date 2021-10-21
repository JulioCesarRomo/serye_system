import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';


export const ErrorRutas: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ErrorComponent
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(ErrorRutas)],
    exports: [RouterModule]
  })
  export class ErrorRoutingModule { }