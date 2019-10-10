import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  @Input() cls;

  @Input() single;

  constructor() { }

  ngOnInit() {
  }
}
