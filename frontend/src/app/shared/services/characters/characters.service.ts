import { Injectable } from '@angular/core';

import * as Characters from '../../../api/controllers/Characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor() { }

  getCharacters() {
    return Characters.getCharacters();
  }

  getCharacter(id) {
    return Characters.getCharacter(id);
  }

  getCuriosities() {
    return Characters.getCuriosities();
  }
}
