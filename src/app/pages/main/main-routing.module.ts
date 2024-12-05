import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

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
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },  {
    path: 'fav-cancion',
    loadChildren: () => import('./fav-cancion/fav-cancion.module').then( m => m.FavCancionPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
