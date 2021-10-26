import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'colaboradores',
    loadChildren: () => import('./colaboradores/colaboradores.module').then( m => m.ColaboradoresPageModule)
  },
  {
    path: 'areas',
    loadChildren: () => import('./areas/areas.module').then( m => m.AreasPageModule)
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./asistencias/asistencias.module').then( m => m.AsistenciasPageModule)
  },
  {
    path: 'tipo-asistencias',
    loadChildren: () => import('./tipo-asistencias/tipo-asistencias.module').then( m => m.TipoAsistenciasPageModule)
  },
  {
    path: 'feriados',
    loadChildren: () => import('./feriados/feriados.module').then( m => m.FeriadosPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
