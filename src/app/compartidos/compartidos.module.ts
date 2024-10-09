import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputClientesComponent } from './componentes/input-clientes/input-clientes.component';


@NgModule({
  declarations: [
    HeaderComponent,
    InputClientesComponent,

  ],
  exports: [
    HeaderComponent,
    InputClientesComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CompartidosModule { }
