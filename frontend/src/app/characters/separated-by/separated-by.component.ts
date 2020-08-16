import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ArtistsService, ClassesService, DebutsService } from 'src/app/shared';

@Component({
  selector: 'app-separated-by',
  templateUrl: './separated-by.component.html',
  styleUrls: ['./separated-by.component.scss']
})
export class SeparatedByComponent implements OnInit {
  pageTitle = "";

  pageContent: any = { groups: [] };

  path = 'classes/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistsService: ArtistsService,
    private classesService: ClassesService,
    private debutsService: DebutsService,
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
    const responseSaints: any = await this.classesService.getAllClasses().toPromise();

    let saints: any = [];

    if (id !== "0") {
      let response: any = {};

      if (path === "artist") {
        response = await this.artistsService.getArtist(id).toPromise();

        this.pageTitle = `Artist: ${response.name}`;

        saints = responseSaints.filter(saint => id === saint.artist.id);
      } else if (path === "debut") {
        response = await this.debutsService.getDebut(id).toPromise();

        this.pageTitle = `Debut: ${response.midia}: ${response.name}`;

        saints = responseSaints.filter(saint => response.name === saint.debut && response.midia === saint.midia);
      }

      this.pageContent = { ...response, groups: [] };
    } else {
      if (path === "artist") {
        this.pageTitle = "Unknown artists";

        saints = responseSaints.filter(saint => saint.artist === "");
      } else if (path === "debut") {
        this.pageTitle = "Debut yet unidentified";

        saints = responseSaints.filter(saint => saint.debut === "");
      }
    }

    const grouped: any = this.groupBy(saints, "class");

    for (let group in grouped) {
      const sorted = grouped[group].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);

      this.pageContent.groups.push({ name: group, saints: sorted })
    }

    this.pageContent.groups = this.pageContent.groups.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
  }

  groupBy(items, key): any {
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [
          ...(result[item[key]] || []),
          item,
        ],
      }),
      {},
    );
  }

}
