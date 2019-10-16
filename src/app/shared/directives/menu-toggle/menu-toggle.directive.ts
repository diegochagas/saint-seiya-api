import { Directive, ElementRef, HostListener } from '@angular/core';

import { HeaderComponent } from '../../components';

@Directive({
  selector: '[appMenuToggle]'
})
export class MenuToggleDirective {

  constructor(private elementRef: ElementRef, private headerComponent: HeaderComponent) { }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const { classList } = this.headerComponent.menuToggle.nativeElement;

    if (this.elementRef.nativeElement.contains(event.target)) {
      if (classList.contains('show')) {
        classList.remove('show');
      } else {
        classList.add('show');
      }
    }
  }
}
