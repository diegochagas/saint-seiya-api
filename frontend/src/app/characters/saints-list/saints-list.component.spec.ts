import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaintsListComponent } from './saints-list.component';

describe('SaintsListComponent', () => {
  let component: SaintsListComponent;
  let fixture: ComponentFixture<SaintsListComponent>;

  beforeEach(waitForAsync(() => {
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
