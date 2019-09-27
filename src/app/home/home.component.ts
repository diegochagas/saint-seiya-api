import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urls = [];

  constructor( private urlsService: UrlsService ) { }

  ngOnInit() {
    this.urlsService.getUrls().subscribe((response: any) => this.urls = response);
  }

}
