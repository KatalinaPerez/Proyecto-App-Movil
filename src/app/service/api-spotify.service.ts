import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  private baseUrl = 'https://spotify23.p.rapidapi.com/search/';
  private apiKey = '1f0d6a3291msh2b955fd6cedd810p11daccjsn0293ad3b9a38';

  constructor(private http: HttpClient) {}

  searchTrack(trackName: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    });

    const params = {
      q: trackName,
      type: 'tracks',
      limit: 55,
    };

    return this.http.get(this.baseUrl, { headers, params });
  }
}