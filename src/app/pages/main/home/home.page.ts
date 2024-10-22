import { Component, inject, OnInit } from '@angular/core';
import { ApiSpotifyService } from '../../../service/api-spotify.service'
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tracks: any[] = [];
  hasSearched: boolean = false;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private spotifyService: ApiSpotifyService, private router: Router) { }

  ngOnInit() {
  }

  //Cierre sesion
  signOut(){
    this.firebaseSvc.signOut();
  }

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
//Funcion para abrir la pagina donde se vera la cancion
  openCancion(track: any) {
    this.getPreviewUrl(track.data.id).subscribe(previewUrl => {
      this.router.navigate(['/cancion'],
        {
          queryParams: {
            trackName: track.data.name,
            trackArtist: this.getArtists(track.data.artists.items),
            trackCover: track.data.albumOfTrack.coverArt.sources[2].url,
            previewUrl: previewUrl // Ahora esto tendrá el valor correcto
          }
        }
      );
    });
  }

  getPreviewUrl(trackId: string): Observable<string> {
    return this.spotifyService.getTrackById(trackId).pipe(
      map(response => {
        const track = response.tracks[0];
        console.log('API Response TraksById:', response);
        return track.preview_url;      
      }),
      catchError(error => {
        console.error('Error obteniendo la URL del preview:', error);
        return of(null); // Devuelve null en caso de error
      })
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
