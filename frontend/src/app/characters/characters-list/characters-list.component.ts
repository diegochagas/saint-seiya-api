import { Component, OnInit, ɵbypassSanitizationTrustScript } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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

  displayedColumns: string[] = ['image', 'id', 'name'];

  dataSource = [];

  dataSourceOthers = [];

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

      this.dataSource = response.characters.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    } else if (this.detailsType === 'classes') {
      this.pageTitle = this.className.replace('-', ' ');

      this.path = 'classes/';

      if (this.className === 'all-classes') {
        const response: any = await this.classesService.getAllClasses().toPromise();

        this.dataSource = response.saints.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      } else if (this.className === 'constellations') {
        this.pageTitle = '88 constellations';

        this.pageSubTitle = 'Old constellations';

        this.path = 'constellation/all';

        const response: any = await this.classesService.getConstellations().toPromise();

        this.dataSource = response.data.modernConstellations;

        this.dataSourceOthers = response.data.otherConstellations.filter(constellation => constellation.saints.length);
      } else if (this.className === 'evil-stars') {
        this.pageTitle = '108 evil stars';

        this.pageSubTitle = 'Other evil stars';

        this.path = 'evil-star/all';

        const response: any = await this.classesService.getEvilStars().toPromise();

        this.dataSource = response.data.evilStars;

        this.dataSourceOthers = response.data.otherEvilStars.filter(evilStar => evilStar.saints.length);
      } else {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.dataSource = response.saints.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
    }
  }

  characterDetails(id) {
    this.router.navigate([`/characters/${this.path}/${id}`]);
  }
}
