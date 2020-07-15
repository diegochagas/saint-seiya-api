import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DebutsService, ClassesService } from '../../services';

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

  constructor( private classesService: ClassesService, private debutsService: DebutsService ) { }

  ngOnInit() {
    this.getClasses();

    this.getDebuts();
  }

  async getClasses() {
    const response: any = await this.classesService.getClassNames().toPromise();

    response.forEach(cls => this.classes.push(cls.name));

    this.classes.sort();
  }

  async getDebuts() {
    const response: any = await this.debutsService.getDebuts().toPromise();

    response.forEach(debut => this.debuts.push(debut.midia));

    this.debuts = Array.from(new Set(this.debuts)).sort();
  }
}
