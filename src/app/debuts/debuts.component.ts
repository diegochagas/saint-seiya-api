import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debuts',
  template: `
    <div class="debuts">
      <router-outlet></router-outlet>
    </div>
  `
})
export class DebutsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
