/*import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false; //variable que empiez en falso


  constructor(private authService: AuthService, private router: Router) { }

  //funcion que es true
  login(): boolean {
    this.loggedIn = true; 
    localStorage.setItem('usuario', 'nombre de usuario que se conecta'); 
    return this.loggedIn;
  }
  //funcion que es falso
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('usuario');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }
}*/

