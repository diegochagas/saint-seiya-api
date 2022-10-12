import { Component, OnInit } from '@angular/core';

import {
  CharactersService,
  ClassesService,
  DebutsService
} from '../shared';

@Component({
  selector: 'app-test-calls',
  templateUrl: './test-calls.component.html',
  styleUrls: ['./test-calls.component.scss']
})
export class TestCallsComponent implements OnInit {
  pageURL = '';

  characterIds = [];

  characterId;

  charactersResponse;

  isLoadingCharacters = false;

  characterResponse;

  isLoadingCharacter = false;

  curiositiesResponse;

  isLoadingCuriosities = false;

  allClassesResponse;

  isLoadingAllClasses = false;

  classNames = [];

  className;

  classIds = [];

  classId;

  classNameId;

  classesResponse;

  isLoadingClasses = false;

  classResponse;

  isLoadingClass = false;

  debutsResponse;

  isLoadingDebuts = false;

  debutIds = [];

  debutId;

  debutResponse;

  isLoadingDebut = false;

  constructor(
    private charactersService: CharactersService,
    private classesService: ClassesService,
    private debutsService: DebutsService
  ) { }

  ngOnInit() {
    this.pageURL = `https://saint-seiya-api.herokuapp.com/api`;

    this.loadIds();

    this.loadClassesNames();
  }

  loadIds () {
    for (let i = 1; i <= 10; i++) {
      this.characterIds.push(i);

      this.debutIds.push(i);
    }
  }

  async loadClassesNames () {
    this.classNames = await this.classesService.getClassNames();
  }

  async getCharacters() {
    this.isLoadingCharacters = true;

    const response: any = this.charactersService.getCharacters();

    this.charactersResponse = JSON.stringify(response.slice(0, 10));

    this.isLoadingCharacters = false;
  }

  async getCharacter() {
    this.isLoadingCharacter = true;

    const response: any = this.charactersService.getCharacter(this.characterId);

    this.characterResponse = JSON.stringify(response);

    this.isLoadingCharacter = false;
  }

  async getCuriosities() {
    this.isLoadingCuriosities = true;

    const response: any = this.charactersService.getCuriosities();

    this.curiositiesResponse = JSON.stringify(response);

    this.isLoadingCuriosities = false;
  }

  async getClasses() {
    this.isLoadingAllClasses = true;

    const response: any = this.classesService.getAllClasses();

    this.allClassesResponse = JSON.stringify(response.slice(0, 10));

    this.isLoadingAllClasses = false;
  }

  async getClass() {
    this.isLoadingClasses = true;

    const response: any = this.classesService.getClass(this.className);

    let allSaintsResponse: any = {};

    for (const property in response) {
      response[property].forEach(warrriorType => {
        const saints = warrriorType.saints.length > 5 ? warrriorType.saints.slice(0, 5) : warrriorType.saints;

        allSaintsResponse[property] = { name: warrriorType.name, saints };
      });
    }

    this.classesResponse = JSON.stringify(allSaintsResponse);

    this.isLoadingClasses = false;
  }

  async selectClassName(className) {
    this.classNameId = className;

    const response: any = this.classesService.getClass(className);

    if (className.toLocaleLowerCase().includes('constellations')) {
      this.classIds = [
        ...response.modernConstellations.map(cls => cls.id),
        ...response.otherConstellations.map(cls => cls.id)
      ];
    } else if (className.toLocaleLowerCase().includes('evil')) {
      this.classIds = [
        ...response.evilStars.map(cls => cls.id),
        ...response.otherEvilStars.map(cls => cls.id)
      ];
    } else {
      const allSaintsResponse = [];

      for (const property in response) {
        response[property].forEach(warrriorType => {
          allSaintsResponse.push(...warrriorType.saints);
        });
      }

      this.classIds = allSaintsResponse.map(cls => cls.id);
    }

    this.classId = undefined;
  }

  async getSaint() {
    this.isLoadingClass = true;

    const response: any = this.classesService.getSaint(this.classNameId, this.classId);

    this.classResponse = JSON.stringify(response);

    this.isLoadingClass = false;
  }

  async getDebuts() {
    this.isLoadingDebuts = true;

    const response: any = this.debutsService.getDebuts();

    this.debutsResponse = JSON.stringify(response.slice(0, 10));

    this.isLoadingDebuts = false;
  }

  async getDebut() {
    this.isLoadingDebut = true;

    const response: any = this.debutsService.getDebut(this.debutId);

    this.debutResponse = JSON.stringify(response);

    this.isLoadingDebut = false;
  }
}
