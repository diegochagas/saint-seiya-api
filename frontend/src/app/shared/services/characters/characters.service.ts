import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { getCharactersData, getCharacterData, getCuriositiesData } from './characters.controllers'

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
    if (environment.production) return this.http.get(`${this.api}/characters`, { headers: this.headers });
    else return getCharactersData()
  }

  getCharacter(id) {
    if (environment.production) return this.http.get(`${this.api}/character/${id}`, { headers: this.headers });
    else return getCharacterData(id);
  }

  getCuriosities() {
    if (environment.production) return this.http.get(`${this.api}/curiosities`, { headers: this.headers });
    else return getCuriositiesData();
  }
}
