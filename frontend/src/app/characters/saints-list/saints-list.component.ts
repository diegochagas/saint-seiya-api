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
    if (this.detailsType === 'classes') {
      this.pageTitle = this.className.replace('-', ' ');

      this.path = 'classes/';

      if (this.className === 'saints') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "88 Athena Saints", items: response.constellations });
        this.groups.push({ title: "Saints with former constellations", items: response.formerConstellations });
        this.groups.push({ title: "Saints with Hindu constellations", items: response.hinduConstellations });
        this.groups.push({ title: "Saints with Chinese constellations", items: response.chineseConstellations });
        this.groups.push({ title: "Saints without constellations", items: response.withoutConstellations });
        this.groups.push({ title: "Soldiers Saints", items: response.soldiers });
        this.groups.push({ title: "Apprentices Saints", items: response.apprentices });
        this.groups.push({ title: "Gladiators", items: response.gladiators });
      } else if (this.className === 'specters') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Hades Representative", items: response.representative });
        this.groups.push({ title: "108 Hades Specters", items: response.evilStars });
        this.groups.push({ title: "Unknown Evil Star", items: response.unknownEvilStar });
        this.groups.push({ title: "Hades skeleton soldiers", items: response.skeletons });
        this.groups.push({ title: "Pluto Faceless", items: response.faceless });
      } else if (this.className === 'pallasites') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "First class pallasites", items: response.firstClass });
        this.groups.push({ title: "Second class pallasites", items: response.secondClass });
        this.groups.push({ title: "Third class pallasites", items: response.thirdClass });
        this.groups.push({ title: "Unknown class pallasites", items: response.unknownClass });
        this.groups.push({ title: "Pallasites soldiers", items: response.soldiers });
      } else if (this.className === 'berserkers') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Ares Berserkers", items: response.berserkers });
        this.groups.push({ title: "Martians", items: response.martians });
      } else if (this.className === 'gigas') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Typhon Sons", items: response.sons });
        this.groups.push({ title: "Typhon Brothers", items: response.brothers });
      } else if (this.className === 'god-warriors') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Representatives", items: response.representatives });
        this.groups.push({ title: "God Warriors", items: response.godWarriors });
        this.groups.push({ title: "Blue Warriors", items: response.blueWarriors });
      } else if (this.className === 'satellites') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Satellites", items: response.saints });
      } else if (this.className === 'mariners') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.groups.push({ title: "Gods", items: response.gods });
        this.groups.push({ title: "Mariners", items: response.saints });
      } else if (this.className === 'titans') {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.path = 'classes/';

        this.groups.push({ title: "Titans", items: response.titans });

        this.groups.push({ title: response.others[0].name, items: response.others });
      } else {
        this.groups = [];

        const response: any = await this.classesService.getClass(this.className).toPromise();

        this.path = 'classes/';

        if (response.gods) this.groups.push({ title: response.gods[0].name, items: response.gods });

        if (response.saints) this.groups.push({ title: response.saints[0].name, items: response.saints });
      }
    }
  }
}
