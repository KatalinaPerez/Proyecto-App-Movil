import { Injectable } from '@angular/core';
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
    localStorage.setItem('token', 'your_token_here'); 
    return this.loggedIn;
  }

  //funcion que es falso
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

