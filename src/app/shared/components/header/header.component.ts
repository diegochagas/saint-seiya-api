import { Component, OnInit } from '@angular/core';
import { DebutsService, ClassesService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  midias = [];

  classes = [];

  constructor( private debutsService: DebutsService, private classesService: ClassesService ) { }

  ngOnInit() {
    this.getDebuts();

    this.getClasses();
  }

  async getDebuts() {
    const response: any = await this.debutsService.getDebuts().toPromise();

    response.data.forEach(debut => this.midias.push(debut.midia));

    this.midias = Array.from(new Set(this.midias)).sort();
  }

  getClasses() {
    this.classesService.getClassNames().subscribe((response: any) => {
      response.data.forEach(cls => this.classes.push(cls.name));

      this.classes.sort();
    });
  }
}
