import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-zodiac-wheel',
  templateUrl: './zodiac-wheel.component.html',
  styleUrls: ['./zodiac-wheel.component.scss']
})
export class ZodiacWheelComponent implements OnInit {
  @Input() color;

  constructor() { }

  ngOnInit() {
  }

}
