import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutenticacionPageRoutingModule } from './autenticacion-routing.module';

import { AutenticacionPage } from './autenticacion.page';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutenticacionPageRoutingModule,
    CompartidosModule
  ],
  declarations: [AutenticacionPage]
})
export class AutenticacionPageModule {}
