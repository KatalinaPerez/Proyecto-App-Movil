import { Component, OnInit} from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, lockClosed} from 'ionicons/icons';
import { Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro:any={
    NombreUsuario:"",
    correo:"",
    contrasena:"",
    confcontrasena:"",
  }
  field:string="";

  contrasena: string = 'password';
  ojo: string = 'eye-off';

  contrasenaConf: string = 'password';
  ojoConf: string = 'eye-off';

  //contrasenaError: boolean = false;

  constructor(public router: Router, public toastController: ToastController) { 
    addIcons({ eye, lockClosed});
  }

  ngOnInit() {
  }

  inhome(){
    if(this.validateModel(this.registro)){
      this.router.navigate(['/home']);
      this.presentToast("top","Bienvenido",2000)
    }else{
      this.presentToast("middle","Error - Falta: "+this.field);//Mensaje de error
    }
  }

  visibilidadContrasena(){
    if(this.contrasena === 'password'){
      this.contrasena = 'text';
      this.ojo = 'eye';
    }else{
      this.contrasena = 'password';
      this.ojo = 'eye-off';
    }
  }

  visibilidadContrasenaConf(){
    if(this.contrasenaConf === 'password'){
      this.contrasenaConf = 'text';
      this.ojoConf = 'eye';
    }else{
      this.contrasenaConf = 'password';
      this.ojoConf = 'eye-off';
    }
  }

  /*validarContrasenas() {
    this.contrasenaError = this.registro.contrasena !== this.registro.confcontrasena;
  }*/

  validateModel(model:any){
    for(var [key ,value] of Object.entries(model)){
      if(value == ""){
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, duration?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:2500,
      position: position,
      
    });

    await toast.present();
  }
}
