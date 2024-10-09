import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
