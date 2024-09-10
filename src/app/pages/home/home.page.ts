import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  cards = [
    { type: 'album', title: 'Chemtrails Over The Country Club', image: 'assets/imagenes/COCC-Lana-Del-Rey.jpg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Born To Die', image: 'assets/imagenes/Lana-Del-Rey-Born-To-Die-album.jpg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Honeymoon', image: 'assets/imagenes/lana-del-rey-honeymoon.jpg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Lust For Life', image: 'assets/imagenes/LANA-DEL-REY-LustForLife.jpeg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Norman Fucking Rockwell', image: 'assets/imagenes/NFR-Lana-Del_Rey.webp', artist: 'Lana del Rey' },
  ];
}