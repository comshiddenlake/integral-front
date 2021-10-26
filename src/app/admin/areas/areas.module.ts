import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreasPageRoutingModule } from './areas-routing.module';

import { AreasPage } from './areas.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AreasPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [AreasPage]
})
export class AreasPageModule { }
