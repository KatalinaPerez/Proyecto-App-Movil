import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavCancionPage } from './fav-cancion.page';

const routes: Routes = [
  {
    path: '',
    component: FavCancionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavCancionPageRoutingModule {}
