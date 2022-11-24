import { Injectable } from '@angular/core';

import * as Classes from '../../../api/controllers/Classes';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  constructor() { }

  getAllClasses() {
    return Classes.getAllClasses();
  }

  getClass(className: string) {
    return Classes.getClassSaints(className);
  }

  getSaint(className: string, id: string) {
    return Classes.getSaint(className, id);
  }

  /* unused routes
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
  */

  getClassesByArtist(id: string) {
    return Classes.getClassesByArtist(id);
  }

  getClassesByDebut(id: string) {
    return Classes.getClassesByDebut(id);
  }

  getClassNames() {
    return Classes.getClassNames();
  }
}
