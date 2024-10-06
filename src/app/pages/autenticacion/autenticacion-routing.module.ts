import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutenticacionPage } from './autenticacion.page';

const routes: Routes = [
  {
    path: '',
    component: AutenticacionPage
  },
    path: 'contrasena-olvidada',
    loadChildren: () => import('./contrasena-olvidada/contrasena-olvidada.module').then( m => m.ContrasenaOlvidadaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacionPageRoutingModule {}