import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

import * as emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.page.html',
  styleUrls: ['./contrasena-olvidada.page.scss'],
})
export class ContrasenaOlvidadaPage implements OnInit {
  constructor() {
    emailjs.init('KMKG8WoDeil--y6Dp'); // Coloca tu User ID
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  firabaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {

  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firabaseSvc.sendPassEmail(this.form.value.email).then(res => {
        
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

  async enviarEmail() {
    if (this.form.valid) {
      const email = this.form.value.email;
  
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      try {
        // Buscar usuario en Firebase por email
        const userDoc = await this.firabaseSvc.getUserByEmail(email);
        if (!userDoc) {
          throw new Error('No se encontró un usuario con este correo.');
        }
  
        // Obtener UID del usuario
        const uid = userDoc.uid;
  
        // Actualizar la contraseña en la base de datos
        const userPath = `users/${uid}`;
  
        // Obtener el nombre del usuario para personalizar el correo
        const userInfo = await this.firabaseSvc.getDocumento(userPath);
        const userName = userInfo?.['name'] || 'Usuario';
  
        // Enviar el correo con EmailJS
        const templateParams = {
          to_email: email,
          name: userName,
        };
  
        await emailjs.send('service_7a86y8k', 'template_eseb5rl', templateParams);
        console.log('Correo enviado exitosamente');
  
        // Mostrar mensaje de éxito
        this.utilsSvc.presentToast({
          message: 'Contraseña actualizada y correo enviado correctamente.',
          duration: 2000,
          color: 'success',
          position: 'top',
        });
  
        // Resetear el formulario
        this.form.reset();
  
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
  
        // Mostrar mensaje de error
        this.utilsSvc.presentToast({
          message: 'Ocurrió un error al actualizar la contraseña. Intenta nuevamente.',
          duration: 2500,
          color: 'danger',
          position: 'top',
        });
      } finally {
        loading.dismiss();
      }
    } else {
      this.utilsSvc.presentToast({
        message: 'Por favor completa el formulario correctamente.',
        duration: 2500,
        color: 'warning',
        position: 'top',
      });
    }
  }
  
}