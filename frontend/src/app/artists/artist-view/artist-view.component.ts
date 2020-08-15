import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ArtistsService, ClassesService } from 'src/app/shared';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent implements OnInit {
  pageTitle = "Artists";

  artist: any = { groups: [] };

  path = 'classes/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistsService: ArtistsService,
    private classesService: ClassesService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getSaints(this.activatedRoute.snapshot.params.id);
      }
    });

  }

  ngOnInit(): void {
  }

  async getSaints(id: string) {
    const response: any = await this.artistsService.getArtist(id).toPromise();

    const responseSaints: any = await this.classesService.getAllClasses().toPromise();

    this.artist = { ...response, groups: [] };

    const saints: any = responseSaints.filter(saint => id === saint.artist.id);

    const grouped: any = this.groupBy(saints, "class");

    for (let group in grouped) {
      const sorted = grouped[group].sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);

      this.artist.groups.push({ name: group, saints: sorted })
    }

    this.artist.groups = this.artist.groups.sort((a, b) => a.name == b.name ? 0 : + (a.name > b.name) || -1);
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
