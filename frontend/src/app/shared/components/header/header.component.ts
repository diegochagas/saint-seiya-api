import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DebutsService, ClassesService, ArtistsService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuToggle', { static: true }) menuToggle: ElementRef;

  @ViewChild('classesButton', { static: true }) classesButton: ElementRef;

  classes = [];

  debuts = [];

  artists = [];

  constructor(
    private artistsService: ArtistsService,
    private debutsService: DebutsService,
  ) { }

  ngOnInit() {
    this.getClasses();

    this.getDebuts();

    this.getArtists();
  }

  async getClasses() {
    this.classes = [
      { name: 'Angels', route: 'angels' },
      { name: 'Berserkers / Martians', route: 'berserkers' },
      { name: 'Corona Saints', route: 'corona-saints' },
      { name: 'Dryads', route: 'dryads' },
      { name: 'Fairies', route: 'fairies' },
      { name: 'Gigas', route: 'gigas' },
      { name: 'Gladiators', route: 'gladiators' },
      { name: 'God Warriors / Blue Warriors', route: 'god-warriors' },
      { name: 'Golden Tribe', route: 'golden-tribe' },
      { name: 'Jaguars', route: 'jaguars' },
      { name: 'Jewels', route: 'jewels' },
      { name: 'Lamech Saints', route: 'lamech-saints' },
      { name: 'Legionaries', route: 'legionaries' },
      { name: 'Mariners', route: 'mariners' },
      { name: 'Others', route: 'others' },
      { name: 'Pallasites', route: 'pallasites' },
      { name: 'Saints', route: 'saints' },
      { name: 'Satellites', route: 'satellites' },
      { name: 'Specters / Faceless', route: 'specters' },
      { name: 'Taonias', route: 'taonias' },
      { name: 'Titans', route: 'titans' },
    ];
  }

  async getDebuts() {
    const response: any = await this.debutsService.getDebuts().toPromise();

    response.forEach(debut => this.debuts.push(debut.midia));

    this.debuts = Array.from(new Set(this.debuts)).sort();
  }

  async getArtists() {
    const response: any = await this.artistsService.getArtists().toPromise();

    response.forEach(artist => {
      if (artist.name !== "") this.artists.push(artist);
    });

    this.artists.push({ name: "Unknown artists", id: "0" });
  }
}
