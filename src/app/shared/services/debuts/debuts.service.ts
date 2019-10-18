import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

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
    return this.http.get(`${this.api}/debuts`, { headers: this.headers });
  }

  getDebut(id) {
    return this.http.get(`${this.api}/debut/${id}`, { headers: this.headers });
  }
}
