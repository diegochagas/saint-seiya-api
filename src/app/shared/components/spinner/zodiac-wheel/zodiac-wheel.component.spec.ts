import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacWheelComponent } from './zodiac-wheel.component';

describe('ZodiacWheelComponent', () => {
  let component: ZodiacWheelComponent;
  let fixture: ComponentFixture<ZodiacWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZodiacWheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZodiacWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
