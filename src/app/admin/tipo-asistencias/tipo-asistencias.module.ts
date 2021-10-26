import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoAsistenciasPageRoutingModule } from './tipo-asistencias-routing.module';

import { TipoAsistenciasPage } from './tipo-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TipoAsistenciasPageRoutingModule
  ],
  declarations: [TipoAsistenciasPage]
})
export class TipoAsistenciasPageModule {}
