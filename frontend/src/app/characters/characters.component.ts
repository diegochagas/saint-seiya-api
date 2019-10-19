import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters',
  template: `
    <div class="characters">
      <router-outlet></router-outlet>
    </div>`
})
export class CharactersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
