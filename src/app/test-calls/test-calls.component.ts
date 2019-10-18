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

  characterResponse;

  curiositiesResponse;

  classNamesResponse;

  allClassesResponse;

  classNames = [];

  className;

  classIds = [];

  classId;

  classNameId;

  classesResponse;

  classResponse;

  debutsResponse;

  debutIds = [];

  debutId;

  debutResponse;

  constructor(
    private charactersService: CharactersService,
    private classesService: ClassesService,
    private debutsService: DebutsService
  ) { }

  ngOnInit() {
    this.pageURL = `https://saint-seiya-api.herokuapp.com/api`;

    this.getCharacterIds();

    this.getClassesNames();

    this.getDebutIds();
  }

  async getCharacterIds () {
    const response: any = await this.charactersService.getCharacters().toPromise();

    response.data.forEach(character => this.characterIds.push(character.id));
  }

  async getClassesNames () {
    const response: any = await this.classesService.getClassNames().toPromise();

    response.data.forEach(cls => this.classNames.push(cls.name.replace(' ', '-').toLowerCase()));

    this.classNames.push('evil-stars', 'constellations');

    this.classNames.sort();
  }

  getCharacters() {
    this.charactersService.getCharacters().subscribe((response: any) => this.charactersResponse = this.buildJsonView(response));
  }

  getCharacter() {
    this.charactersService.getCharacter(this.characterId).subscribe((response: any) => this.characterResponse = this.buildJsonView(response));
  }

  getCuriosities() {
    this.charactersService.getCuriosities().subscribe((response: any) => this.curiositiesResponse = this.buildJsonView(response));
  }

  getClassNames() {
    this.classesService.getClassNames().subscribe((response: any) => this.classNamesResponse = this.buildJsonView(response));
  }

  getClasses() {
    this.classesService.getAllClasses().subscribe((response: any) => this.allClassesResponse = this.buildJsonView(response));
  }

  getClass() {
    this.classesService.getClass(this.className).subscribe((response: any) => this.classesResponse = this.buildJsonView(response));
  }

  async selectClassName(className) {
    this.classNameId = className;

    const response: any = await this.classesService.getClass(className).toPromise();

    const message = response.message.toLocaleLowerCase();

    if (message.includes('constellations')) {
      this.classIds = [
        ...response.data.modernConstellations.map(cls => cls.id),
        ...response.data.otherConstellations.map(cls => cls.id)
      ];
    } else if (message.includes('evil')) {
      this.classIds = [
        ...response.data.evilStars.map(cls => cls.id),
        ...response.data.otherEvilStars.map(cls => cls.id)
      ];
    } else {
      this.classIds = response.data.map(cls => cls.id);
    }

    this.classId = undefined;
  }

  getSaint() {
    this.classesService.getSaint(this.classNameId, this.classId).subscribe((response: any) => this.classResponse = this.buildJsonView(response));
  }

  getDebuts() {
    this.debutsService.getDebuts().subscribe((response: any) => this.debutsResponse = this.buildJsonView(response));
  }

  getDebut() {
    this.debutsService.getDebut(this.debutId).subscribe((response: any) => this.debutResponse = this.buildJsonView(response));
  }

  async getDebutIds() {
    const response: any = await this.debutsService.getDebuts().toPromise();

    response.data.forEach(debut => this.debutIds.push(debut.id));
  }

  buildJsonView(response) {
    return `{
      "message": "${response.message}",
      "data": ${JSON.stringify(Array.isArray(response.data) ? response.data.slice(0, 10) : response.data)}
    }`;
  }
}
