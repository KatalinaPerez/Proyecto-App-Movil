import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';
import { User } from 'src/app/models/user.model';
//import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.page.html',
  styleUrls: ['./contrasena-olvidada.page.scss'],
})

export class ContrasenaOlvidadaPage implements OnInit {

  private emailjsUserId = 'hCO7YABSyqikv68ru4TPg'; // Obtén este valor de tu cuenta EmailJS

  constructor(public emailjs: EmailJSResponseStatus) {
    emailjs.init();
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required]),
  });

  firabaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firabaseSvc
        .signIn(this.form.value as User)
        .then((res) => {
          this.getUserInfo(res.user.uid);
        })
        .catch((error) => {
          console.log(error);

          this.utilsSvc.presentToast({
            message:
              'El usuario o la contraseña es inválido, porfavor vuelva a ingresar',
            duration: 2500,
            color: 'tertiary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        }) //al obtener respuesta el loading debe desaparecer:
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firabaseSvc
        .getDocumento(path)
        .then((user: User) => {
          this.utilsSvc.saveLocal('users', user);
          this.utilsSvc.routerLink('/main/home');
          this.form.reset();

          this.utilsSvc.presentToast({
            message: `Bienvenid@ ${user.name}`,
            duration: 1500,
            color: 'tertiary',
            position: 'middle',
            icon: 'person-circle-outline',
          });
        })
        .catch((error) => {
          console.log(error);

          this.utilsSvc.presentToast({
            message:
              'El usuario o la contraseña es inválido, porfavor vuelva a ingresar',
            duration: 2500,
            color: 'tertiary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        }) //al obtener respuesta el loading debe desaparecer:
        .finally(() => {
          loading.dismiss();
        });
    }
  }
  async enviarEmail(email: string, resetLink: string): Promise<void> {
    const templateParams = {
      to_email: email,
      reset_link: resetLink, // Genera un enlace único para el cambio de contraseña
    };

    return emailjs
      .send('service_7a86y8k', 'template_eseb5rl', templateParams)
      .then((response) => {
        console.log(
          'Email enviado exitosamente',
          response.status,
          response.text
        );
      })
      .catch((error) => {
        console.error('Error al enviar el email', error);
      });
  }
}

/*async enviarEmail() {
    const email = this.form.value.email;
    const nuevaContrasena = this.form.value.contrasena;
  
    const emailOptions = {
      to: email,
      subject: 'Recuperación de Contraseña',
      body: `Hola,<br><br>Tu nueva contraseña es: <strong>${nuevaContrasena}</strong><br><br>Por favor, cámbiala después de iniciar sesión.`,
      isHtml: true,
    };
  
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        this.emailComposer.open(emailOptions);
      } else {
        console.error('El cliente de correo no está disponible.');
        this.utilsSvc.presentToast({
          message: "No se pudo enviar el correo. Asegúrate de tener configurado un cliente de correo.",
          duration: 2500,
          color: 'danger',
          position: 'bottom',
        });
      }
    }).catch(error => {
      console.error('Error al verificar el cliente de correo:', error);
      this.utilsSvc.presentToast({
        message: "Ocurrió un error al intentar enviar el correo.",
        duration: 2500,
        color: 'danger',
        position: 'bottom',
      });
    });
  }*/
