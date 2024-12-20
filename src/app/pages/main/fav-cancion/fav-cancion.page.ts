import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';
import { User } from 'src/app/models/user.model';

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
  stars: boolean[] = [false, false, false, false, false]; // Representación de las estrellas (5 estrellas)
  favoritos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    emailjs.init('KMKG8WoDeil--y6Dp'); // Coloca tu User ID
  }
  firabaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.trackName = params['trackName'];
      this.trackArtist = params['trackArtist'];
      this.trackCover = params['trackCover'];
      this.previewUrl = params['previewUrl'];
      this.cancionId = params['cancionId'];
    });

    // Cargar favoritos del almacenamiento local
    const favoritosGuardados = localStorage.getItem('favoritos');
    this.favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  }


  playTrack() {
    const audioUrl = this.previewUrl; // La URL debe ser válida
    const audio = new Audio(audioUrl);
    audio.play();
  }

  //Funciones favoritos

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
