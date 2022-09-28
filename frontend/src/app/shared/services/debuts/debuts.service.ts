import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { getDebutsData, getDebutData } from './debuts.controllers'

@Injectable({
  providedIn: 'root'
})
export class DebutsService {
  api = environment.apiRest;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  });

  constructor( private  http: HttpClient ) { }

  getDebuts() {
    if (environment.production) return this.http.get(`${this.api}/debuts`, { headers: this.headers });
    else return getDebutsData();
  }

  getDebut(id) {
    if (environment.production) return this.http.get(`${this.api}/debut/${id}`, { headers: this.headers });
    else return getDebutData(id);
  }
}
