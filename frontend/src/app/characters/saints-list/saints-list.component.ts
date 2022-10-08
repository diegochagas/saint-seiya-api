import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ClassesService } from '../../shared';

@Component({
  selector: 'app-saints-list',
  templateUrl: './saints-list.component.html',
  styleUrls: ['./saints-list.component.scss']
})
export class SaintsListComponent implements OnInit {
  groups = [];

  detailsType = '';

  className;

  pageTitle = '';

  path = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private classesService: ClassesService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.className = this.activatedRoute.snapshot.params.class;

        this.detailsType = this.activatedRoute.snapshot.params.details;

        this.getCharacters();
      }
    });
  }

  ngOnInit(): void {
  }

  orderSaints(items): void {
    return items.map(item => {
      item.saints = item.saints.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);

      return item
    });
  }

  async getCharacters() {
    if (this.detailsType === 'classes') {
      this.pageTitle = this.className.replaceAll('-', ' ');

      this.path = 'classes/';

      let response: any;

      if (environment.production) response = await this.classesService.getClass(this.className).toPromise();
      else response = this.classesService.getClass(this.className);

      this.groups = response;
    }
  }
}
