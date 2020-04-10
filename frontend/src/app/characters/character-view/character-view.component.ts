import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
    private router: Router,
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.detailsType = this.activatedRoute.snapshot.params.details;

        this.id = this.activatedRoute.snapshot.params.id;

        this.className = this.activatedRoute.snapshot.params.class;

        this.character = undefined;

        this.getCharacter();
      }
    });
  }

  ngOnInit() {
  }

  async getCharacter() {
    if (this.detailsType === 'personal') {
      this.character = await this.charactersService.getCharacter(this.id).toPromise();
    } else if (this.detailsType === 'classes') {
      this.character = await this.classService.getSaint(this.className, this.id).toPromise();
    } else if (this.detailsType === 'constellation') {
      this.character = await this.classService.getConstellation(this.id).toPromise();
    } else if (this.detailsType === 'evil-star') {
      this.character = await this.classService.getEvilStar(this.id).toPromise();
    }

    if (this.character.symbolTag) {
      const symbols = this.character.symbolTag.split('-');

      this.character.symbolName = symbols[0];
      this.character.symbolNumber = symbols[1];
    }
  }
}
