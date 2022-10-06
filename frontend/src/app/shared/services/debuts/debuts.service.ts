import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { getDebutsData, getDebutData, debutsData, midiasData } from './debuts.controllers'

@Injectable({
  providedIn: 'root'
})
export class DebutsService {
  api = environment.apiRest;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  });

  midias: any = []
  debuts: any = []

  constructor( private  http: HttpClient ) {
    if (environment.production) {
      this.debuts = this.http.get(`${this.api}/debuts`, { headers: this.headers });
      this.midias = this.http.get(`${this.api}/midias`, { headers: this.headers });
    } else {
      this.debuts = debutsData;
      this.midias = midiasData;
    }
  }

  getDebuts() {
    return getDebutsData(this.debuts, this.midias);
  }

  getDebut(id) {
    return getDebutData(this.debuts, this.midias, id);
  }
}
