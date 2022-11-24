import { Injectable } from '@angular/core';

import * as Artists from '../../../api/controllers/Artists'

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  constructor() {}

  getArtists() {
    return Artists.getArtists();
  }

  getArtist(id) {
    return Artists.getArtist(id);
  }
}
