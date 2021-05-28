import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  @Input() character;

  @Input() single;

  constructor() { }

  ngOnInit() {

    console.log(this.character)
  }

}
