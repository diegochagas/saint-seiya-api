import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  api = environment.apiRest;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  });

  constructor( private  http: HttpClient ) { }

  getClassNames() {
    return this.http.get(`${this.api}/class-names`, { headers: this.headers });
  }

  getAllClasses() {
    return this.http.get(`${this.api}/all-classes`, { headers: this.headers });
  }

  getClass(className: string) {
    return this.http.get(`${this.api}/${className}`, { headers: this.headers });
  }

  getSaint(className: string, id: string) {
    return this.http.get(`${this.api}/${className}/${id}`, { headers: this.headers });
  }

  getConstellations() {
    return this.http.get(`${this.api}/constellations`, { headers: this.headers });
  }

  getConstellation(id: string) {
    return this.http.get(`${this.api}/constellation/${id}`, { headers: this.headers });
  }
}
