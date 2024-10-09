import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-clientes',
  templateUrl: './input-clientes.component.html',
  styleUrls: ['./input-clientes.component.scss'],
})
export class InputClientesComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isContrasena!: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    if(this.type == 'password') this.isContrasena = true;
  }
  mostrarContrasena(){
    this.hide = !this.hide;
    //para que el ojito se abra o cierre
    if(this.hide) this.type = 'password';
    else this.type = 'text';
  }

}
