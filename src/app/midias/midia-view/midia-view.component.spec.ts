import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiaViewComponent } from './midia-view.component';

describe('MidiaViewComponent', () => {
  let component: MidiaViewComponent;
  let fixture: ComponentFixture<MidiaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
