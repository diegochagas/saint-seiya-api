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
      { name: 'Cyclops', route: 'cyclops' },
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

    this.debuts = response.filter(debut => {
      if (debut.id !== "2" &&
          debut.id !== "11" &&
          debut.id !== "13" &&
          debut.id !== "15" &&
          debut.id !== "17" &&
          debut.id !== "20" &&
          debut.id !== "26" &&
          debut.id !== "31" &&
          debut.id !== "33" &&
          debut.id !== "34") {
        debut.title = `${debut.midia}: ${debut.name}`

        return debut;
      }
    });

    this.debuts = this.debuts.sort((a, b) => a.title == b.title ? 0 : + (a.title > b.title) || -1);
  }

  async getArtists() {
    const response: any = await this.artistsService.getArtists().toPromise();

    response.forEach(artist => {
      if (artist.name !== "") this.artists.push(artist);
    });

    this.artists.push({ name: "Unknown artists", id: "0" });
  }
}
