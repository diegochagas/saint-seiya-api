import { Injectable } from '@angular/core';

import * as Debuts from '../../../api/controllers/Debuts'

@Injectable({
  providedIn: 'root'
})
export class DebutsService {
  constructor() { }

  getDebuts() {
    return Debuts.getDebuts();
  }

  getDebut(id) {
    return Debuts.getDebut(id);
  }
}
