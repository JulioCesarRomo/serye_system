import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AutenticacionInicioGuard} from './nucleo/guardias/autenticacion-inicio.guard';
import {AutenticacionGuard} from './nucleo/guardias/autenticacion.guard';

const rutas: Routes = [
  {
    path: 'inicio',
    canActivate: [AutenticacionInicioGuard],
    loadChildren: () => import('./compartido/componentes/inicio/inicio.module')
        .then(m => m.InicioModule)
  },
  {
    path: 'login',
    canActivate: [AutenticacionGuard],
    loadChildren: () => import('./compartido/componentes/login/login.module')
        .then(m => m.LoginModule)
  },
  {
    path: 'not-found',
    canActivate: [AutenticacionInicioGuard],
    loadChildren: () => import('./compartido/componentes/error/error.module')
        .then(m => m.ErrorModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(rutas, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
