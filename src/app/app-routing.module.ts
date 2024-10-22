import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './guard/no-auth.guard';
import { AuthGuard } from './guard/auth.guard';
import { CancionPage } from './pages/main/spotify/cancion/cancion.page';

const routes: Routes = [
  {//mi pagina de inicio debe ser home
    path: '',
    redirectTo: 'autenticacion',
    pathMatch: 'full'
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./pages/autenticacion/autenticacion.module').then( m => m.AutenticacionPageModule),
    canActivate:[noAuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canActivate:[AuthGuard]
    
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/autenticacion/registro/registro.module').then( m => m.RegistroPageModule),
  },
  { path: 'cancion', component: CancionPage },

  /*
  {
    path: 'home',
    loadChildren: () => import('./pages/main/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'main',
    children: [
      {
        path: 'home',
        component: HomePage,
      }
    ]
  },*/

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }