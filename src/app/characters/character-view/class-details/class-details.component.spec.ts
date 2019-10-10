import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsComponent } from './class-details.component';

describe('ClassDetailsComponent', () => {
  let component: ClassDetailsComponent;
  let fixture: ComponentFixture<ClassDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
