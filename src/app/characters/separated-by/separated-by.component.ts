import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ClassesService } from 'src/app/shared';

@Component({
  selector: 'app-separated-by',
  templateUrl: './separated-by.component.html',
  styleUrls: ['./separated-by.component.scss']
})
export class SeparatedByComponent implements OnInit {
  pageTitle = "";

  pageContent: any = { groups: [], loading: true };

  path = 'classes/';

  site = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private classesService: ClassesService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { path } = this.activatedRoute.snapshot.url[0];

        const { id } = this.activatedRoute.snapshot.params;

        this.getSaints(id, path);
      }
    });

  }

  ngOnInit(): void {
  }

  async getSaints(id: string, path: string) {
    let saints: any = [];
    let response: any = {};

    if (path === "artist") {
      response = this.classesService.getClassesByArtist(id);

      const artist = this.findArtist(response, id);

      this.site = artist.site || '';

      this.pageTitle = id === '0' ? 'Unknown artists' : `Artist: ${artist.name}`;

      saints = response
    } else if (path === "debut") {
      response = this.classesService.getClassesByDebut(id);

      this.pageTitle = id === '0' ? 'Not revealed' : `Debut: ${response[0].debut.midia.name}: ${response[0].debut.name}`;

      saints = response;
    }

    this.pageContent = { ...response, groups: [] };

    const grouped: any = this.groupBy(saints, "class", "classSingular");

    for (let group in grouped) {
      const sorted = grouped[group].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);

      this.pageContent.groups.push({ name: group, saints: sorted, namePlural: sorted[0].class.class })
    }

    this.pageContent.groups = this.pageContent.groups.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);

    this.pageContent.loading = false;
  }

  groupBy(items, key, secondKey): any {
    return items.reduce((result, item) => ({
        ...result,
        [item[key][secondKey]]: [
          ...(result[item[key][secondKey]] || []),
          item,
        ],
      }),
      {},
    );
  }

  findArtist(saints, id): any {
    let artist = {}

    for(let i = 0; i < saints.length; i++) {
      if (Object.values(artist).length > 0) {
        break;
      } else {
        if (saints[i].artists) {
          for(let j = 0; j < saints[i].artists.length; j++) {
            if(saints[i].artists[j].details.id == id) {
              artist = saints[i].artists[j].details;
            }

            if (Object.values(artist).length > 0) {
              break;
            }
          }
        }
      }
    }

    return artist;
  }
}
