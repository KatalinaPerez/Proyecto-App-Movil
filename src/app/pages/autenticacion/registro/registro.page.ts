import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

    form = new FormGroup({
        //Obtenemos uid al crear nuevo usuario
        uid: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        contrasena: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required, Validators.minLength(4)])//nombre con minimo  4 letras
    })

    firabaseSvc = inject(FirebaseService);
    utilsSvc = inject(UtilsService);

    ngOnInit() {

    }

    async submit() {
        if (this.form.valid) {

            const loading = await this.utilsSvc.loading();
            await loading.present();

            this.firabaseSvc.signUp(this.form.value as User).then(async res => {

                await this.firabaseSvc.updateUser(this.form.value.name);

                let uid = res.user.uid;//creamos variable
                this.form.controls.uid.setValue(uid);//se la pasamos al formulario
                this.setUserInfo(uid);//guardamos uid con funcion

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

    async setUserInfo(uid: string) {
        if (this.form.valid) {

            const loading = await this.utilsSvc.loading();
            await loading.present();

            let path = `users/${uid}`;
            //la contraseña no se debe guardar en nuestra base de dato
            delete this.form.value.contrasena;

            this.firabaseSvc.setDocumento(path, this.form.value, ).then(async res => {
                //debemos mantener usuarios localmente y enrutar al home 
                this.utilsSvc.saveLocal('user', this.form.value)
                this.utilsSvc.routerLink('/main/home');
                
                this.form.reset();

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