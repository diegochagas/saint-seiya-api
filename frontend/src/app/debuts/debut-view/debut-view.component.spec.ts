import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutViewComponent } from './debut-view.component';

describe('DebutViewComponent', () => {
  let component: DebutViewComponent;
  let fixture: ComponentFixture<DebutViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
