import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasenaOlvidadaPageRoutingModule } from './contrasena-olvidada-routing.module';

import { ContrasenaOlvidadaPage } from './contrasena-olvidada.page';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasenaOlvidadaPageRoutingModule,
    CompartidosModule
  ],
  declarations: [ContrasenaOlvidadaPage],
  providers: [EmailComposer]
})
export class ContrasenaOlvidadaPageModule {}
