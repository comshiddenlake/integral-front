import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoAsistenciasPage } from './tipo-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: TipoAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoAsistenciasPageRoutingModule {}
