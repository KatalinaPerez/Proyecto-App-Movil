import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //objeto login que almacena los datos de usuario y contraseña
  login:any={
    usuario:"",
    contrasena:""
  }
  //variable para obtener el nombre del campo vacío
  field:string="";
  constructor(public router: Router, public toastController: ToastController, public alertContoller:AlertController, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.login=this.router.getCurrentNavigation()?.extras?.state?.['login'];
        console.log(this.login)
      }
    });
  }

  ngOnInit() {
  }

  ingresar(){
    if(this.validateModel(this.login)){
      this.router.navigate(['/home']);//*si es exitoso redirige a home
      this.presentToast("top","Bienvenido "+ this.login.usuario,2000)
    }else{
      this.presentToast("middle","Falta: "+this.field);//Mensaje de error
    }    
  }

  inRegistro(){
    this.router.navigate(['/registro']);
  }

  //validateModel para validar el ingreso de algo en los campos de mi html mediante el modelo login
  validateModel(model:any){
    //Recorro todas las entradas que me entrega el Object entries obteniendo
    //el par key : value
    for(var [key ,value] of Object.entries(model)){
      //reviso si value = "" y retorno false e indico campo faltante
      if(value == ""){
        this.field = key;
        return false;
      }
    } 
    //si termina el for es que los valores fueron ingresados
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
