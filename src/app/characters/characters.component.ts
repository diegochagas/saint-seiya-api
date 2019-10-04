import { Component, OnInit } from '@angular/core';

import { CharactersService } from '../shared';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters = [];

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.charactersService.getCharacters().subscribe((response: any) => this.characters = response.data);
  }
}
