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
      } else if (this.className === 'angels') {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Angels", items: response.angels });
        this.groups.push({ title: "Fallen Angels", items: response.fallenAngels });
      } else if (this.className === 'berserkers') {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Legion Of Disaster", items: response.disasterLegion });
        this.groups.push({ title: "Legion Of Fear", items: response.fearLegion });
        this.groups.push({ title: "Legion Of Fire", items: response.fireLegion });
        this.groups.push({ title: "Legion Of Flame", items: response.flameLegion });
        this.groups.push({ title: "Mars Representative", items: response.marsRepresentative });
        this.groups.push({ title: "Four Heavenly Kings of Mars", items: response.heavenlyKings });
        this.groups.push({ title: "High Martians", items: response.highMartians });
        this.groups.push({ title: "Martians", items: response.martians });
        this.groups.push({ title: "Martian Soldiers", items: response.soldiers });
      } else {
        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.path = 'classes/';

        this.groups.push({ title: "Gods", items: response.gods });

        this.groups.push({ title: "88 Athena Saints", items: response.constellations });

        this.groups.push({ title: "Saints with former constellations", items: response.formerConstellations });

        this.groups.push({ title: "Saints with Hindu constellations", items: response.hinduConstellations });

        this.groups.push({ title: "Saints with Chinese constellations", items: response.chineseConstellations });

        this.groups.push({ title: "Saints without constellations", items: response.withoutConstellations });

        this.groups.push({ title: "Soldiers Saints", items: response.soldiers });

        this.groups.push({ title: "Apprentices Saints", items: response.apprentices });
      }
    }
  }
}
