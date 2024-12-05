import { Component, inject, OnInit } from '@angular/core';
import { ApiSpotifyService } from '../../../service/api-spotify.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';
import { Router } from '@angular/router';
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

  constructor(
    private spotifyService: ApiSpotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  //Cierre sesion
  signOut() {
    this.firebaseSvc.signOut();
  }

  searchTrack(trackName: string) {
    if (!trackName) {
      return;
    }
    this.hasSearched = true;

    // Presentar el loading
    this.utilsSvc.loading().then((loading) => {
      loading.present();

      this.spotifyService.searchTrack(trackName).subscribe(
        (response) => {
          console.log('API Response:', response); // Verifica lo que la API está retornando
          this.tracks = response.tracks?.items || []; // Asegúrate de que 'items' existe
        },
        (error) => {
          console.error('Error:', error);
          this.tracks = [];
        },
        () => {
          // Ocultar el loading una vez que se complete la búsqueda
          loading.dismiss();
        }
      );
    });
  }

  //Funcion para abrir la pagina donde se vera la cancion
  openCancion(track: any) {
    this.getPreviewUrl(track.data.id).subscribe((previewUrl) => {
      this.getLyrics(track.data.id).subscribe((lyrics) => {
        this.router.navigate(['/cancion'], {
          queryParams: {
            trackName: track.data.name,
            trackArtist: this.getArtists(track.data.artists.items),
            trackCover: track.data.albumOfTrack.coverArt.sources[2].url,
            previewUrl: previewUrl,
            cancionId: track.data.id,
            lyrics: lyrics, // Letras completas
          },
        });
      });
    });
  }

  getPreviewUrl(trackId: string): Observable<string> {
    return this.spotifyService.getTrackById(trackId).pipe(
      map((response) => {
        const track = response.tracks[0];
        console.log('API Response TraksById:', response);
        return track.preview_url;
      }),
      catchError((error) => {
        console.error('Error obteniendo la URL del preview:', error);
        return of(null); // Devuelve null en caso de error
      })
    );
  }

  getArtists(artists: any[]): string {
    return artists.map((artist) => artist.profile.name).join(', ');
  }

  getLyrics(trackId: string): Observable<string> {
    return this.spotifyService.getTrakLyrycs(trackId).pipe(
      map((response) => {
        // Asegurarse de que existan líneas
        const lines = response.lyrics?.lines || [];

        // Extraer y concatenar las palabras (words) de cada línea
        const fullLyrics = lines.map((line) => line.words).join('\n');

        console.log('Full Lyrics:', fullLyrics); // Para depuración
        return fullLyrics; // Devuelve las letras completas
      }),
      catchError((error) => {
        console.error('Error obteniendo las letras:', error);
        return of('Letras no disponibles'); // Mensaje en caso de error
      })
    );
  }
}

