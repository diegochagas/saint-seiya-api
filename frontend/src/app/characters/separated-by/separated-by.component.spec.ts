import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatedByComponent } from './separated-by.component';

describe('SeparatedByComponent', () => {
  let component: SeparatedByComponent;
  let fixture: ComponentFixture<SeparatedByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparatedByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparatedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
