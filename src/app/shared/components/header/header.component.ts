import { Component, OnInit } from '@angular/core';
import { DebutsService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  debuts = [];

  midias = [];

  constructor( private debutsService: DebutsService ) { }

  ngOnInit() {
    this.getDebuts();
  }

  getDebuts() {
    this.debutsService.getDebuts().subscribe((response: any) => {
      this.debuts = response.data.map(debut => {
        this.midias.push(debut.midia);

        return debut;
      });

      this.midias = Array.from(new Set(this.midias));
    }, err => {
      console.error(err.message);
    });
  }
}
