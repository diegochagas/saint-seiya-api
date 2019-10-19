import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutListComponent } from './debut-list.component';

describe('DebutListComponent', () => {
  let component: DebutListComponent;
  let fixture: ComponentFixture<DebutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
