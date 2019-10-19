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

        this.getCharacter();
      }
    });
  }

  ngOnInit() {
  }

  getCharacter() {
    if (this.detailsType === 'personal') {
      console.log(this.id, this.detailsType, this.className);

      this.charactersService.getCharacter(this.id).subscribe((response: any) => this.character = response.character);
    } else if (this.detailsType === 'classes') {
      this.classService.getSaint(this.className, this.id).subscribe((response: any) => this.character = response.saint);
    } else if (this.detailsType === 'constellation') {
      this.classService.getConstellation(this.id).subscribe((response: any) => this.character = response.constellation);
    } else if (this.detailsType === 'evil-star') {
      this.classService.getEvilStar(this.id).subscribe((response: any) => this.character = response.evilStar);
    }
  }
}
