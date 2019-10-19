import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-evil-star-details',
  templateUrl: './evil-star-details.component.html',
  styleUrls: ['./evil-star-details.component.scss']
})
export class EvilStarDetailsComponent implements OnInit {
  @Input() evilStar;

  @Input() single;

  constructor() { }

  ngOnInit() {
  }

}
