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

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    private classesService: ClassesService,
  ) {
    this.detailsType = this.activatedRoute.snapshot.params.details;

    this.className = this.activatedRoute.snapshot.params.class;
  }

  ngOnInit() {
    if (this.detailsType === 'personal') {
      this.charactersService.getCharacters().subscribe((response: any) => this.characters = response.data);
    } else if (this.detailsType === 'classes') {
      if (this.className === 'all-classes') {
        this.classesService.getAllClasses().subscribe((response: any) => this.characters = response.data);
      } else {
        this.classesService.getClass(this.className).subscribe((response: any) => this.characters = response.data);
      }
    }

  }
}
