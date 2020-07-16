import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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

  async getCharacters() {
    this.groups = [];

    console.log(this.detailsType);

    if (this.detailsType === 'classes') {
      this.pageTitle = this.className.replace('-', ' ');

      this.path = 'classes/';

      if (this.className === 'saints') {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "88 Athena Saints", items: response.constellations });
        this.groups.push({ title: "Saints with former constellations", items: response.formerConstellations });
        this.groups.push({ title: "Saints with Hindu constellations", items: response.hinduConstellations });
        this.groups.push({ title: "Saints with Chinese constellations", items: response.chineseConstellations });
        this.groups.push({ title: "Saints without constellations", items: response.withoutConstellations });
        this.groups.push({ title: "Soldiers Saints", items: response.soldiers });
        this.groups.push({ title: "Apprentices Saints", items: response.apprentices });
      } else if (this.className === 'specters') {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Hades Representative", items: response.representative });
        this.groups.push({ title: "108 Hades Specters", items: response.evilStars });
        this.groups.push({ title: "Unknown Evil Star", items: response.unknownEvilStar });
        this.groups.push({ title: "Hades skeleton soldiers", items: response.skeletons });
        this.groups.push({ title: "Pluto Faceless", items: response.faceless });
      } else if (this.className === 'pallasites') {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "First class pallasites", items: response.firstClass });
        this.groups.push({ title: "Second class pallasites", items: response.secondClass });
        this.groups.push({ title: "Third class pallasites", items: response.thirdClass });
        this.groups.push({ title: "Unknown class pallasites", items: response.unknownClass });
        this.groups.push({ title: "Pallasites soldiers", items: response.soldiers });
      } else if (this.className === 'berserkers') {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Ares Berserkers", items: response.berserkers });
        this.groups.push({ title: "Martians", items: response.martians });
      } else {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.path = 'classes/';

        this.groups.push({ title: response.gods[0].name, items: response.gods });

        this.groups.push({ title: response.saints[0].name, items: response.saints });
      }
    }
  }
}
