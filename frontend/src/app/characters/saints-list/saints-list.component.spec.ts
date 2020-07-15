import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaintsListComponent } from './saints-list.component';

describe('SaintsListComponent', () => {
  let component: SaintsListComponent;
  let fixture: ComponentFixture<SaintsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaintsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
