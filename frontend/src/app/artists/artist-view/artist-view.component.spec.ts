import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistViewComponent } from './artist-view.component';

describe('ArtistViewComponent', () => {
  let component: ArtistViewComponent;
  let fixture: ComponentFixture<ArtistViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
