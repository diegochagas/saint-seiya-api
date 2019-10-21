import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { DebutsService } from 'src/app/shared';

@Component({
  selector: 'app-debut-list',
  templateUrl: './debut-list.component.html',
  styleUrls: ['./debut-list.component.scss']
})
export class DebutListComponent implements OnInit {
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
    this.midia = this.activatedRoute.snapshot.params.list;

    const response: any = await this.debutsService.getDebuts().toPromise();

    if (this.midia === 'all') this.debuts = response;
    else this.debuts = response.filter(debut => debut.midia.replace(' ', '-').toLowerCase() === this.midia);
  }
}
