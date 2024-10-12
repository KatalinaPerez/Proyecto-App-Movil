import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean {
    return this.authService.isLoggedIn(); // Usa el método de instancia para verificar autenticación
  }
}
