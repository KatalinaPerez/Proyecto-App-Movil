import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
<<<<<<< HEAD
import { AuthGuard } from 'src/app/guard/auth.guard';
import { noAuthGuard } from 'src/app/guard/no-auth.guard';
=======
>>>>>>> chris

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
<<<<<<< HEAD
=======
  {
    path: 'cancion',
    loadChildren: () => import('./spotify/cancion/cancion.module').then( m => m.CancionPageModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./spotify/album/album.module').then( m => m.AlbumPageModule)
  },
  {
    path: 'artista',
    loadChildren: () => import('./spotify/artista/artista.module').then( m => m.ArtistaPageModule)
  }
>>>>>>> chris

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
