import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';
import { User } from 'firebase/auth'; // Importa el tipo User desde Firebase

import * as emailjs from '@emailjs/browser';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.page.html',
  styleUrls: ['./cancion.page.scss'],
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
  favoritos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {
    emailjs.init('KMKG8WoDeil--y6Dp'); // Coloca tu User ID
  }

  firabaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  lyrics: string = ''; // Variable para almacenar las letras

  async ngOnInit() {
    // Obtenemos los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.trackName = params['trackName'];
      this.trackArtist = params['trackArtist'];
      this.trackCover = params['trackCover'];
      this.previewUrl = params['previewUrl'];
      this.cancionId = params['cancionId'];
      this.lyrics = params['lyrics'];
    });

    // Cargar favoritos desde localStorage
    this.loadFavoritos();

    // Obtenemos el rating promedio de la canción
    this.averageRating = await this.firebaseService.getSongAverage(
      this.cancionId
    );
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
      this.averageRating = await this.firebaseService.getSongAverage(
        this.cancionId
      ); // Recalcular el promedio
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

  //Funciones favoritos
  toggleFavorito(track: any) {
    const isFavorito = this.isFavorito(track);
    if (isFavorito) {
      this.favoritos = this.favoritos.filter(
        (fav) => fav.data.id !== track.data.id
      );
    } else {
      this.favoritos.push(track);
    }
    console.log('Favoritos guardados:', this.favoritos);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  isFavorito(track: any): boolean {
    return this.favoritos.some((fav) => fav.data.id === track.data.id);
  }

  loadFavoritos() {
    const storedFavoritos = localStorage.getItem('favoritos');
    this.favoritos = storedFavoritos ? JSON.parse(storedFavoritos) : [];
  }

  async enviarSongEmail() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    try {
      const currentUser = (await this.firebaseService.getCurrentUser()) as User; // Asegura que currentUser es de tipo User
      const userEmail = currentUser?.email;

      if (!userEmail) {
        throw new Error('No se pudo obtener el correo del usuario.');
      }

      // Constantes con el nombre de la canción y su promedio de rating
      const songName = this.trackName;
      const songArtist = this.trackArtist;
      const songRating = this.averageRating.toFixed(2); // Formateamos a 2 decimales

      // Template para enviar el correo
      const templateParams = {
        to_email: userEmail, // Cambia por un input o valor dinámico si es necesario
        song_name: songName,
        song_rating: songRating,
        song_artist: songArtist,
      };

      // Enviar correo con EmailJS
      await emailjs.send('service_7a86y8k', 'template_eseb5rl', templateParams);
      console.log('Correo enviado exitosamente');

      // Mostrar mensaje de éxito
      this.utilsSvc.presentToast({
        message:
          'La información de la canción ha sido compartida exitosamente.',
        duration: 2000,
        color: 'success',
        position: 'top',
      });
    } catch (error) {
      console.error('Error al enviar el correo:', error);

      // Mostrar mensaje de error
      this.utilsSvc.presentToast({
        message:
          'Ocurrió un error al compartir la canción. Intenta nuevamente.',
        duration: 2500,
        color: 'danger',
        position: 'top',
      });
    } finally {
      loading.dismiss();
    }
  }
}
