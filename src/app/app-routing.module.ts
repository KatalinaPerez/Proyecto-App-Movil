import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/main/home/home.page';
import { noAuthGuard } from './guard/no-auth.guard';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'autenticacion',
    pathMatch: 'full'
  },
  {
    path: 'autenticacion',
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
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/autenticacion/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate:[noAuthGuard]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  
  /*
  {
    path: 'home',
    loadChildren: () => import('./pages/main/home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'main',
    children: [
      {
        path: 'home',
        component: HomePage,
      }
    ]
  },
  */

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }