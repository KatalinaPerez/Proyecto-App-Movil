import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancionPageRoutingModule } from './cancion-routing.module';

import { CancionPage } from './cancion.page';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancionPageRoutingModule,
    CompartidosModule
  ],
  declarations: [CancionPage]
})
export class CancionPageModule {}
