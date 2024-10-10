import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('',[Validators.required])
  })

  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) { 
    this.authService = authService; // Asigna el AuthService
    this.router = router; // Asigna el Router
    };
  
  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      const { email, contrasena } = this.form.value;
      const loggedIn = this.authService.login(); // Simula el inicio de sesión
      if (loggedIn) {
        this.router.navigate(['/home']); // Redirige al home si el inicio de sesión es exitoso
      } else {
        // Aquí puedes manejar errores de autenticación si es necesario
        console.error('Login failed');
      }
    }
  }

}
