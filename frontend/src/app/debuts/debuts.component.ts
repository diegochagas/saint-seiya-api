import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { DebutsService } from '../shared';

@Component({
  selector: 'app-debuts',
  templateUrl: './debuts.component.html',
  styleUrls: ['./debuts.component.scss']
})
export class DebutsComponent implements OnInit {
  pageTitle = 'Debuts';

  debuts = [];

  midia = '';

  constructor(
    private debutsService: DebutsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getDebuts();
      }
    });
  }

  ngOnInit() {
  }

  async getDebuts() {
    const response: any = await this.debutsService.getDebuts().toPromise();

    const orderedDebuts = response.sort((a, b) => a.release - b.release);

    this.midia = this.activatedRoute.snapshot.params.midia;

    if (this.midia) {
      this.debuts = orderedDebuts.filter(debut => {
        return debut.midia.replace(' ', '-').toLowerCase() === this.midia;
      });
    } else this.debuts = orderedDebuts;
  }
}
