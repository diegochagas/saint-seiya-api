import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-icon',
  templateUrl: './image-icon.component.html',
  styleUrls: ['./image-icon.component.scss']
})
export class ImageIconComponent implements OnInit {
  @Input() image;

  @Input() text;

  letter = '';

  backgroundColor = '';

  constructor() { }

  ngOnInit() {
    this.letter = this.text.charAt(0);

    this.backgroundColor = this.getRandomColor();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';

    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}
