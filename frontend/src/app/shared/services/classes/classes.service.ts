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

  getEvilStars() {
    return this.http.get(`${this.api}/evil-stars`, { headers: this.headers });
  }

  getEvilStar(id: string) {
    return this.http.get(`${this.api}/evil-star/${id}`, { headers: this.headers });
  }

  getClassNames() {
    return [
      { name: 'Angels', route: 'angels' },
      { name: 'Berserkers / Martians', route: 'berserkers' },
      { name: 'Corona Saints', route: 'corona-saints' },
      { name: 'Cyclops', route: 'cyclops' },
      { name: 'Dryads', route: 'dryads' },
      { name: 'Fairies', route: 'fairies' },
      { name: 'Gigas', route: 'gigas' },
      { name: 'Gladiators', route: 'gladiators' },
      { name: 'God Warriors / Blue Warriors', route: 'god-warriors' },
      { name: 'Golden Tribe', route: 'golden-tribe' },
      { name: 'Jaguars', route: 'jaguars' },
      { name: 'Jewels', route: 'jewels' },
      { name: 'Lamech Servants', route: 'lamech-servants' },
      { name: 'Legionaries', route: 'legionaries' },
      { name: 'Mariners', route: 'mariners' },
      { name: 'Others', route: 'others' },
      { name: 'Pallasites', route: 'pallasites' },
      { name: 'Saints', route: 'saints' },
      { name: 'Satellites', route: 'satellites' },
      { name: 'Specters / Faceless', route: 'specters' },
      { name: 'Taonias', route: 'taonias' },
      { name: 'Titans', route: 'titans' },
    ];
  }
}
