import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiSpotifyService } from '../../../../service/api-spotify.service';
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

  constructor(private platform: Platform, private route: ActivatedRoute, private spotifyService: ApiSpotifyService) { }

  // Método para reproducir una pista
  playTrack() {
    const audioUrl = this.previewUrl; // La URL debe ser válida
    const audio = new Audio(audioUrl);
    audio.play();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.trackName = params['trackName'];
      this.trackArtist = params['trackArtist'];
      this.trackCover = params['trackCover'];
      this.previewUrl = params['previewUrl'];
    });
  }

}
