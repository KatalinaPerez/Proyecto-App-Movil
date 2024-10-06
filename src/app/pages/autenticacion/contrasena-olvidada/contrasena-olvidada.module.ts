import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasenaOlvidadaPageRoutingModule } from './contrasena-olvidada-routing.module';

import { ContrasenaOlvidadaPage } from './contrasena-olvidada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasenaOlvidadaPageRoutingModule
  ],
  declarations: [ContrasenaOlvidadaPage]
})
export class ContrasenaOlvidadaPageModule {}
