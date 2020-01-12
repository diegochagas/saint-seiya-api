import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { CharactersService, ClassesService } from '../../shared';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  detailsType;

  className;

  pageTitle = '';

  pageSubTitle = '';

  displayedColumns: string[] = ['image', 'id', 'cloth', 'name'];

  dataSource = new MatTableDataSource([]);

  dataSourceOthers = new MatTableDataSource([]);

  path = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
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

  ngOnInit() {
  }

  async getCharacters() {
    if (this.detailsType === 'personal') {
      this.pageTitle = 'Characters';

      this.path = 'personal/all';

      const response: any = await this.charactersService.getCharacters().toPromise();

      const data = response.map(({ id, name, image, cloths }) => ({ id, name, image, cloths }));

      this.dataSource.data = data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

    } else if (this.detailsType === 'classes') {
      this.pageTitle = this.className.replace('-', ' ');

      this.path = 'classes/';

      if (this.className === 'all-classes') {
        const response: any = await this.classesService.getAllClasses().toPromise();

        this.dataSource.data = response.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      } else if (this.className === 'constellations') {
        this.pageTitle = '88 constellations';

        this.pageSubTitle = 'Old constellations';

        this.path = 'constellation/all';

        const response: any = await this.classesService.getConstellations().toPromise();

        this.dataSource.data = response.modernConstellations;

        this.dataSourceOthers.data = response.otherConstellations.filter(constellation => constellation.saints.length);
      } else if (this.className === 'evil-stars') {
        this.pageTitle = '108 evil stars';

        this.pageSubTitle = 'Other evil stars';

        this.path = 'evil-star/all';

        const response: any = await this.classesService.getEvilStars().toPromise();

        this.dataSource.data = response.evilStars;

        this.dataSourceOthers.data = response.otherEvilStars;
      } else {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.dataSource.data = response.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
    }
  }

  characterDetails(id) {
    this.router.navigate([`/characters/${this.path}/${id}`]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterOthers(filterValue: string) {
    this.dataSourceOthers.filter = filterValue.trim().toLowerCase();
  }
}
