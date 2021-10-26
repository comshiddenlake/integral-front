import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColaboradoresPageRoutingModule } from './colaboradores-routing.module';

import { ColaboradoresPage } from './colaboradores.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    IonicModule,
    ColaboradoresPageRoutingModule
  ],
  declarations: [ColaboradoresPage]
})
export class ColaboradoresPageModule { }
