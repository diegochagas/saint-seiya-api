import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeparatedByComponent } from './separated-by.component';

describe('SeparatedByComponent', () => {
  let component: SeparatedByComponent;
  let fixture: ComponentFixture<SeparatedByComponent>;

  beforeEach(waitForAsync(() => {
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
