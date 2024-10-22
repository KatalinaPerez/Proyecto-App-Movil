import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiSpotifyService } from '../../../../service/api-spotify.service';
@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.page.html',
  styleUrls: ['./cancion.page.scss'],
  providers: [Media]
})
export class CancionPage implements OnInit {
  trackName: string;
  trackArtist: string;
  trackCover: string;
  previewUrl: string;

  private file: MediaObject;

  constructor(private media: Media, private platform: Platform, private route: ActivatedRoute, private spotifyService: ApiSpotifyService) { }

  // Método para reproducir una pista
  playTrack() {
    const audioUrl = this.previewUrl; // La URL debe ser válida
    const audio = new Audio(audioUrl);
    audio.play();
  }

  // Método para pausar la pista
  pauseTrack() {
    if (this.file) {
      this.file.pause(); // Pausar la pista
    }
  }

  // Método para detener la pista
  stopTrack() {
    if (this.file) {
      this.file.stop(); // Detener la pista
      this.file.release(); // Liberar el recurso
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.trackName = params['trackName'];
      this.trackArtist = params['trackArtist'];
      this.trackCover = params['trackCover'];
      this.previewUrl = params['previewUrl']
    });
  }

}
