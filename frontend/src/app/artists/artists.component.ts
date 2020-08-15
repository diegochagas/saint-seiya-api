import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artists',
  template: `
    <div class="characters">
      <router-outlet></router-outlet>
    </div>`
})
export class ArtistsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
