import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstellationDetailsComponent } from './constellation-details.component';

describe('ConstellationDetailsComponent', () => {
  let component: ConstellationDetailsComponent;
  let fixture: ComponentFixture<ConstellationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstellationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstellationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
