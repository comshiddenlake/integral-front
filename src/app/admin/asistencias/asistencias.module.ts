import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasPageRoutingModule } from './asistencias-routing.module';

import { AsistenciasPage } from './asistencias.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    AsistenciasPageRoutingModule
  ],
  declarations: [AsistenciasPage]
})
export class AsistenciasPageModule {}
