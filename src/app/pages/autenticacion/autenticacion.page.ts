import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required])
  })

  firabaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {

  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firabaseSvc.signIn(this.form.value as User).then(res => {

        console.log(res);
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: "El usuario o la contraseña es inválido, porfavor vuelva a ingresar",
          duration: 2500,
          color: 'tertiary',
          position: 'middle',
          icon: 'alert-circle-outline'

        })


      })//al obtener respuesta el loading debe desaparecer:
        .finally(() => {
          loading.dismiss();
        })
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firabaseSvc.getDocumento(path).then((user: User) => {

        this.utilsSvc.saveLocal('user', user)
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();

        this.utilsSvc.presentToast({
          message: `Bienvenid@ ${user.name}`,
          duration: 1500,
          color: 'tertiary',
          position: 'middle',
          icon: 'person-circle-outline'
        })

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: "El usuario o la contraseña es inválido, porfavor vuelva a ingresar",
          duration: 2500,
          color: 'tertiary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })


      })//al obtener respuesta el loading debe desaparecer:
        .finally(() => {
          loading.dismiss();
        })
    }
  }


}
