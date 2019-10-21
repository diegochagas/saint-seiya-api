import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutsComponent } from './debuts.component';

describe('DebutsComponent', () => {
  let component: DebutsComponent;
  let fixture: ComponentFixture<DebutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
