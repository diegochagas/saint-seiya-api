import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZodiacWheelComponent } from './zodiac-wheel.component';

describe('ZodiacWheelComponent', () => {
  let component: ZodiacWheelComponent;
  let fixture: ComponentFixture<ZodiacWheelComponent>;

  beforeEach(waitForAsync(() => {
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
