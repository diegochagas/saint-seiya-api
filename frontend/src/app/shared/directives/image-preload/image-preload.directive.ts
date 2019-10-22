import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src'
  }
})
export class ImagePreloadDirective {
  @Input() src: string;

  @Input() default: string;

  @HostBinding('class') className;

  constructor() { }

  updateUrl() {
    this.src = this.default;

    console.log(this.default);
  }

  load() {
    this.className = 'image-loaded';
  }
}
