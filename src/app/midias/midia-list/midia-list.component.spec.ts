import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiaListComponent } from './midia-list.component';

describe('MidiaListComponent', () => {
  let component: MidiaListComponent;
  let fixture: ComponentFixture<MidiaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
