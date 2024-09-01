import { Component, OnInit} from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  contrasena: string = 'password';
  ojo: string = 'eye-off';

  contrasenaConf: string = 'password';
  ojoConf: string = 'eye-off';
  constructor() { 
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {
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
}
