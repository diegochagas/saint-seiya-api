import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  api = environment.apiRest;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  });

  constructor( private  http: HttpClient ) { }

  getCharacters() {
    return this.http.get(`${this.api}/characters`, { headers: this.headers });
  }

  getCharacter(id) {
    return this.http.get(`${this.api}/character/${id}`, { headers: this.headers });
  }

}
