import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    let curiosities: any;

    if (environment.production) curiosities = await this.charactersService.getCuriosities().toPromise();
    else curiosities = this.charactersService.getCuriosities();

    curiosities.forEach(async character => {
      let response: any;
      if (environment.production) response = await this.charactersService.getCharacter(character.id).toPromise();
      else response = this.charactersService.getCharacter(character.id);

      const { name, image } = response;

      this.characters.push({ ...character, name, image });

      this.characters = this.characters.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    });

  }
}
