import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvilStarDetailsComponent } from './evil-star-details.component';

describe('EvilStarDetailsComponent', () => {
  let component: EvilStarDetailsComponent;
  let fixture: ComponentFixture<EvilStarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvilStarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvilStarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
