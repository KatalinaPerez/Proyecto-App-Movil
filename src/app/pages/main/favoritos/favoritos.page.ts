import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadFavoritos();
  }

  openCancion(track: any) {
    const trackArtists = track.data.artists?.items || []; // Usa un arreglo vacío si items no está definido
    const artistNames = trackArtists.map((artist: any) => artist.profile.name).join(', ');
    this.router.navigate(['/cancion'], {
      queryParams: {
        trackName: track.data.name,
        trackArtist: track.data.artists.items.map((artist: any) => artist.profile.name).join(', '),
        trackCover: track.data.albumOfTrack.coverArt.sources[2]?.url,
        previewUrl: track.preview_url,
      },
    });
  }

  private loadFavoritos() {
    const storedFavoritos = localStorage.getItem('favoritos');
    this.favoritos = storedFavoritos ? JSON.parse(storedFavoritos) : [];
    console.log('Favoritos cargados:', this.favoritos);
  }

  getTrackImageUrl(track: any): string {
    return track.data.albumOfTrack.coverArt?.sources[2]?.url || 'default-image-url'; // Asegúrate de tener una URL por defecto si no existe la imagen
  }
  
  getArtistNames(artists: any[]): string {
    return artists.map(artist => artist.profile.name).join(', ');
  }

}
