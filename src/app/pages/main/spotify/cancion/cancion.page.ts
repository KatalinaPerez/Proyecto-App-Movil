import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.page.html',
  styleUrls: ['./cancion.page.scss']
})
export class CancionPage implements OnInit {
  trackName: string;
  trackArtist: string;
  trackCover: string;
  previewUrl: string;
  cancionId: string;
  averageRating: number;
  ratings: any[] = [];
  userRating: number = 0; // Valor de la calificación seleccionada por el usuario
  stars: boolean[] = [false, false, false, false, false]; // Representación de las estrellas (5 estrellas)

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    // Obtenemos los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.trackName = params['trackName'];
      this.trackArtist = params['trackArtist'];
      this.trackCover = params['trackCover'];
      this.previewUrl = params['previewUrl'];
      this.cancionId = params['cancionId'];
    });

    // Obtenemos el rating promedio de la canción
    this.averageRating = await this.firebaseService.getSongAverage(this.cancionId);
    this.ratings = await this.firebaseService.getRatings(this.cancionId);
  }

  // Establecer la calificación seleccionada por el usuario al hacer clic en una estrella
  setRating(starIndex: number) {
    this.userRating = starIndex; // La calificación seleccionada es el índice de la estrella + 1
    this.stars = this.stars.map((_, index) => index < starIndex); // Actualizamos el estado de las estrellas
  }

  // Enviar la calificación y recalcular el promedio
  async submitRating() {
    if (this.userRating > 0) {
      // Añadir la calificación de la canción
      await this.firebaseService.addRating(this.cancionId, this.userRating);
      this.averageRating = await this.firebaseService.getSongAverage(this.cancionId); // Recalcular el promedio
      this.ratings = await this.firebaseService.getRatings(this.cancionId); // Recargar las calificaciones anteriores
    } else {
      console.log('Por favor, seleccione una calificación.');
    }
  }

  // Método para reproducir una pista
  playTrack() {
    const audioUrl = this.previewUrl; // La URL debe ser válida
    const audio = new Audio(audioUrl);
    audio.play();
  }

  
}
