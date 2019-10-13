import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharactersService, ClassesService } from '../shared';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters = [];

  detailsType;

  className;

  pageTitle = '';

  pageSubTitle = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    private classesService: ClassesService,
  ) {
    this.detailsType = this.activatedRoute.snapshot.params.details;

    this.className = this.activatedRoute.snapshot.params.class;
  }

  ngOnInit() {
    this.getCharacters();
  }

  async getCharacters() {
    if (this.detailsType === 'personal') {
      this.pageTitle = 'Characters';

      this.characters = this.sortCharacters(await this.charactersService.getCharacters().toPromise());
    } else if (this.detailsType === 'classes') {
      this.pageTitle = this.className.replace('-', ' ');

      if (this.className === 'all-classes') {
        this.characters = this.sortCharacters(await this.classesService.getAllClasses().toPromise());
      } else {
        this.characters = this.sortCharacters(await this.classesService.getClass(this.className).toPromise());
      }
    } else if (this.detailsType === 'constellations') {
      this.pageTitle = '88 constellations';

      this.pageSubTitle = 'Other constellations';

      this.classesService.getConstellations().subscribe((response: any) => this.characters = response.data);
    }
  }

  sortCharacters(response) {
    return response.data.sort((a,b) => (a.character > b.character) ? 1 : ((b.character > a.character) ? -1 : 0));
  }
}
