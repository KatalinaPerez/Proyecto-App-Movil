import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';

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

  firabaseSvc = inject(FirebaseService);

  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) { 
    this.authService = authService; // Asigna el AuthService
    this.router = router; // Asigna el Router
    };
  
  ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      this.firabaseSvc.signIn(this.form.value as User).then(res => {
        console.log(res);
      })
    }
  }

  
  /*login() {
    if (this.form.valid) {
      const { email, contrasena } = this.form.value;
      const loggedIn = this.authService.login(); // Simula el inicio de sesión
      if (loggedIn) {
        this.router.navigate(['/home']); // Redirige al home si el inicio de sesión es exitoso
      } else {
        console.error('Error Inicio Sesión');
      }
    }
  }*/


}
