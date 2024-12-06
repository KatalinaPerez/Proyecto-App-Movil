import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavCancionPageRoutingModule } from './fav-cancion-routing.module';

import { FavCancionPage } from './fav-cancion.page';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavCancionPageRoutingModule,
    CompartidosModule
  ],
  declarations: [FavCancionPage]
})
export class FavCancionPageModule {}
