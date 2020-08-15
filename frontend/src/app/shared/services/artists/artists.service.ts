import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  api = environment.apiRest;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  });

  constructor( private  http: HttpClient ) { }

  getArtists() {
    return this.http.get(`${this.api}/artists`, { headers: this.headers });
  }

  getArtist(id) {
    return this.http.get(`${this.api}/artist/${id}`, { headers: this.headers });
  }
}
