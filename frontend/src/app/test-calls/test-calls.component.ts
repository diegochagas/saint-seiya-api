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

  classNamesResponse;

  isLoadingClassNames = false;

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
    const response: any = await this.classesService.getClassNames().toPromise();

    response.forEach(cls => {
      this.classNames.push({
        name: cls.name.replace(' ', '-').toLowerCase(),
        singular: cls.singular.replace(' ', '-').toLowerCase()
      });
    });
  }

  async getCharacters() {
    this.isLoadingCharacters = true;

    const response: any = await this.charactersService.getCharacters().toPromise();

    this.charactersResponse = `{ "characters": ${JSON.stringify(response.characters.slice(0, 10))} }`;

    this.isLoadingCharacters = false;
  }

  async getCharacter() {
    this.isLoadingCharacter = true;

    const response: any = await this.charactersService.getCharacter(this.characterId).toPromise();

    this.characterResponse = JSON.stringify(response);

    this.isLoadingCharacter = false;
  }

  async getCuriosities() {
    this.isLoadingCuriosities = true;

    const response: any = await this.charactersService.getCuriosities().toPromise();

    this.curiositiesResponse = JSON.stringify(response);

    this.isLoadingCuriosities = false;
  }

  async getClassNames() {
    this.isLoadingClassNames = true;

    const response: any = await this.classesService.getClassNames().toPromise();

    this.classNamesResponse = JSON.stringify(response);

    this.isLoadingClassNames = false;
  }

  async getClasses() {
    this.isLoadingAllClasses = true;

    const response: any = await this.classesService.getAllClasses().toPromise();

    this.allClassesResponse = `{ "saints": ${JSON.stringify(response.saints.slice(0, 10))} }`;

    this.isLoadingAllClasses = false;
  }

  async getClass() {
    this.isLoadingClasses = true;

    const response: any = await this.classesService.getClass(this.className).toPromise();

    this.classesResponse = `{ "saints": ${JSON.stringify(response.saints.slice(0, 10))} }`;

    this.isLoadingClasses = false;
  }

  async selectClassName(className) {
    this.classNameId = className;

    const response: any = await this.classesService.getClass(className).toPromise();

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
      this.classIds = response.saints.map(cls => cls.id);
    }

    this.classId = undefined;
  }

  async getSaint() {
    this.isLoadingClass = true;

    const response: any = await this.classesService.getSaint(this.classNameId, this.classId).toPromise();

    this.classResponse = JSON.stringify(response);

    this.isLoadingClass = false;
  }

  async getDebuts() {
    this.isLoadingDebuts = true;

    const response: any = await this.debutsService.getDebuts().toPromise();

    this.debutsResponse = `{ "debuts": ${JSON.stringify(response.debuts.slice(0, 10))} }`;

    this.isLoadingDebuts = false;
  }

  async getDebut() {
    this.isLoadingDebut = true;

    const response: any = await this.debutsService.getDebut(this.debutId).toPromise();

    this.debutResponse = JSON.stringify(response);

    this.isLoadingDebut = false;
  }
}
