import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';

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

  ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      this.firabaseSvc.signIn(this.form.value as User).then(res => {
        console.log(res);
      })
    }
  }

  

}
