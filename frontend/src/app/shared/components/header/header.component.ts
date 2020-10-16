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
    private classesService: ClassesService,
    private debutsService: DebutsService,
  ) { }

  ngOnInit() {
    this.getClasses();

    this.getDebuts();

    this.getArtists();
  }

  async getClasses() {
    this.classes = await this.classesService.getClassNames();
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
