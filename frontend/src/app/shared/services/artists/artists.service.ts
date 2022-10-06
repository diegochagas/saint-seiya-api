import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { getArtistData, artistsData } from './artists.controllers'

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  api = environment.apiRest;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  });

  artists: any = []

  constructor( private  http: HttpClient ) {
    if (environment.production) {
      this.artists = this.http.get(`${this.api}/artists`, { headers: this.headers });
    } else {
      this.artists = artistsData
    }
  }

  getArtists() {
    return this.artists;
  }

  getArtist(id) {
    return getArtistData(this.artists, id);
  }
}
