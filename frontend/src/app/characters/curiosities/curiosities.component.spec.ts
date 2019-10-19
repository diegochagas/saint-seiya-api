import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuriositiesComponent } from './curiosities.component';

describe('CuriositiesComponent', () => {
  let component: CuriositiesComponent;
  let fixture: ComponentFixture<CuriositiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuriositiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriositiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
