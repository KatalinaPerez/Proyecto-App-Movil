import { Component, ViewChild } from '@angular/core';
import { ApiSpotifyService } from '../../../service/api-spotify.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  tracks: any[] = [];
  hasSearched: boolean = false;

  constructor(private spotifyService: ApiSpotifyService) {}

  searchTrack(trackName: string) {
    if (!trackName) {
      return;
    }
    this.hasSearched = true;
    this.spotifyService.searchTrack(trackName).subscribe(
      (response) => {
        console.log('API Response:', response); // Verifica lo que la API está retornando
        this.tracks = response.tracks?.items || []; // Asegúrate de que 'items' existe
      },
      (error) => {
        console.error('Error:', error);
        this.tracks = [];
      }
    );
  }

  getArtists(artists: any[]): string {
    return artists.map(artist => artist.profile.name).join(', ');
  }
  cards = [
    { type: 'album', title: 'Chemtrails Over The Country Club', image: 'assets/imagenes/COCC-Lana-Del-Rey.jpg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Born To Die', image: 'assets/imagenes/Lana-Del-Rey-Born-To-Die-album.jpg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Honeymoon', image: 'assets/imagenes/lana-del-rey-honeymoon.jpg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Lust For Life', image: 'assets/imagenes/LANA-DEL-REY-LustForLife.jpeg', artist: 'Lana del Rey' },
    { type: 'album', title: 'Norman Fucking Rockwell', image: 'assets/imagenes/NFR-Lana-Del_Rey.webp', artist: 'Lana del Rey' },
  ];
}