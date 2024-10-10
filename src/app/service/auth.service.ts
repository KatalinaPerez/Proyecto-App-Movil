import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  login(): boolean {
    this.loggedIn = true;
    localStorage.setItem('token', 'your_token_here'); 
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

