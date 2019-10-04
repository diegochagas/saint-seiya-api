import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharactersService } from '../../shared';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
  character;

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
  ) { }

  ngOnInit() {
    this.charactersService.getCharacter(this.activatedRoute.snapshot.params.id).subscribe((response: any) => this.character = response.data);
  }

}
