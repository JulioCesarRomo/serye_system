import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';

export const InicioRutas: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: '',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../../modulos/dashboard/dashboard.module').then(modulo => modulo.DashboardModule),
      },
      {
        path: 'clientes',
        loadChildren: () => import('../../../modulos/clientes/clientes.module').then(modulo => modulo.ClientesModule),
      },
      {
        path: 'proveedores',
        loadChildren: () => import('../../../modulos/proveedores/proveedores.module').then(modulo => modulo.ProveedoresModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../../../modulos/usuarios/usuarios.module').then(modulo => modulo.UsuariosModule),
      },
      /*{
        path: 'usuarios',
        loadChildren: () => import('../../../modulos/usuarios/usuarios.module').then(modulo => modulo.UsuariosModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../../modulos/perfil/perfil.module').then(modulo => modulo.PerfilModule),
      },
      {
        path: 'licencias',
        loadChildren: () => import('../../../modulos/licencias/licencias.module').then(modulo => modulo.LicenciasModule),
      },
      {
        path: 'folios',
        loadChildren: () => import('../../../modulos/folios/folios.module').then(modulo => modulo.FoliosModule),
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../../../modulos/configuracion/configuracion.module').then(modulo => modulo.ConfiguracionModule),
      },
      {
        path: 'temas-soporte',
        loadChildren: () => import('../../../compartido/submodulos/temas-soporte/temas-soporte.module').then(modulo => modulo.TemasSoporteModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('../../../compartido/componentes/chat/chat.module').then(modulo => modulo.ChatModule),
      },*/
      /*{
        path: 'finanzas',
        canActivate: [ModuloGuard],
        data: { tipoModulo: TiposModulos.Facturacion },
        loadChildren: () => import('../../../modulos/finanzas/finanzas.module')
          .then(m => m.FinanzasModule)
      },*/
      {
        path: 'not-found',
        loadChildren: () => import('../error/error.module')
          .then(m => m.ErrorModule)
      },
      { path: '**', redirectTo: '/not-found', pathMatch: "full" }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(InicioRutas)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
