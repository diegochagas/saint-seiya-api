import { Component, OnInit } from '@angular/core';

import { CharactersService } from '../../shared';

@Component({
  selector: 'app-curiosities',
  templateUrl: './curiosities.component.html',
  styleUrls: ['./curiosities.component.scss']
})
export class CuriositiesComponent implements OnInit {
  characters = [];

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.loadCharacters();
  }

  async loadCharacters() {
    const curiosities: any = await this.charactersService.getCuriosities().toPromise();

    curiosities.forEach(async character => {
      const response: any = await this.charactersService.getCharacter(character.id).toPromise();

      const { name, image } = response;

      this.characters.push({ ...character, name, image });

      this.characters = this.characters.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    });

  }
}
