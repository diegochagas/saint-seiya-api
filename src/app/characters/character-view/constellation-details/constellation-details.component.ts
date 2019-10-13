import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-constellation-details',
  templateUrl: './constellation-details.component.html',
  styleUrls: ['./constellation-details.component.scss']
})
export class ConstellationDetailsComponent implements OnInit {
  @Input() constellation;

  @Input() single;

  constructor() { }

  ngOnInit() {
  }

}
