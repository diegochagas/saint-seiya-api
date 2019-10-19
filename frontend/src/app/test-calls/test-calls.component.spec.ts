import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCallsComponent } from './test-calls.component';

describe('TestCallsComponent', () => {
  let component: TestCallsComponent;
  let fixture: ComponentFixture<TestCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
