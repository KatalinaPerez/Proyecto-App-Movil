import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

//Esta página son herramientas en donde usaremos en todo el proyecto, ya sea el simbolo de espera, los mensajes toust, etc

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadinCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  loading() {
    return this.loadinCtrl.create({ spinner: 'circles' })
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //guardaremos cualquier cosa en BD local .:any, luego pasamos a string
  saveLocal(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // obtenemos info y pasamos a formato original
  getLocal(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }


}
