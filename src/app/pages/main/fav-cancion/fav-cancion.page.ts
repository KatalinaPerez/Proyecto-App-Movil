import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

import * as emailjs from '@emailjs/browser';
@Component({
  selector: 'app-fav-cancion',
  templateUrl: './fav-cancion.page.html',
  styleUrls: ['./fav-cancion.page.scss'],
})

export class FavCancionPage implements OnInit {
  trackName: string;
  trackArtist: string;
  trackCover: string;
  previewUrl: string;
  cancionId: string;
  averageRating: number;
  ratings: any[] = [];
  userRating: number = 0; // Valor de la calificación seleccionada por el usuario
  
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService)
  {
    emailjs.init('KMKG8WoDeil--y6Dp'); // Coloca tu User ID
  }
  firabaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  lyrics: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.trackName = params['trackName'];
      this.trackArtist = params['trackArtist'];
      this.trackCover = params['trackCover'];
      this.previewUrl = params['previewUrl'];
      this.cancionId = params['cancionId'];
      this.lyrics = params['lyrics'];
    });
  }

}
