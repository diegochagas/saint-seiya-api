import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DebutsService, ClassesService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuToggle', { static: false }) menuToggle: ElementRef;

  @ViewChild('classesButton', { static: true }) classesButton: ElementRef;

  classes = [];

  debuts = [];

  constructor( private debutsService: DebutsService, private classesService: ClassesService ) { }

  ngOnInit() {
    this.getDebuts();

    this.getClasses();
  }

  async getDebuts() {
    const response: any = await this.debutsService.getDebuts().toPromise();

    response.debuts.forEach(debut => this.debuts.push(debut.midia));

    this.debuts = Array.from(new Set(this.debuts)).sort();
  }

  async getClasses() {
    const response: any = await this.classesService.getClassNames().toPromise();

    response.forEach(cls => this.classes.push(cls.name));

    this.classes.sort();
  }
}
