import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharactersService, ClassesService } from '../../shared';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
  character;

  detailsType;

  id;

  className;

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    private classService: ClassesService,
  ) {
    this.detailsType = this.activatedRoute.snapshot.params.details;

    this.id = this.activatedRoute.snapshot.params.id;

    this.className = this.activatedRoute.snapshot.params.class;
  }

  ngOnInit() {
    if (this.detailsType === 'personal') {
      this.charactersService.getCharacter(this.id).subscribe((response: any) => this.character = response.data);
    } else if (this.detailsType === 'classes') {
      this.classService.getSaint(this.className, this.id).subscribe((response: any) => this.character = response.data.saint);
    }
  }
}
