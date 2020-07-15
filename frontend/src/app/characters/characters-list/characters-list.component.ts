import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { CharactersService } from '../../shared';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  className;

  pageTitle = '';

  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource([]);

  path = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.className = this.activatedRoute.snapshot.params.class;

        this.getCharacters();
      }
    });
  }

  ngOnInit() {
  }

  async getCharacters() {
    this.displayedColumns = [];

    this.dataSource = new MatTableDataSource([]);

    this.pageTitle = 'Characters';

    this.path = 'personal/all';

    this.displayedColumns = ['image', 'id', 'cloth', 'name'];

    const response: any = await this.charactersService.getCharacters().toPromise();

    const data = response.map(({ id, name, image, cloths }) => {
      const cloth = cloths.length ? cloths[0].cloth : '';

      return { id, name, image, cloth };
    });

    this.dataSource.data = data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

    this.dataSource.data = data.sort((a,b) => (a.cloth > b.cloth) ? 1 : ((b.cloth > a.cloth) ? -1 : 0));
  }

  characterDetails(id) {
    this.router.navigate([`/characters/${this.path}/${id}`]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
