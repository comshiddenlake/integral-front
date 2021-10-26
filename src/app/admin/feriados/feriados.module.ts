import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeriadosPageRoutingModule } from './feriados-routing.module';

import { FeriadosPage } from './feriados.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CalendarModule,
    FeriadosPageRoutingModule
  ],
  declarations: [FeriadosPage]
})
export class FeriadosPageModule {}
