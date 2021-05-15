import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestCallsComponent } from './test-calls.component';

describe('TestCallsComponent', () => {
  let component: TestCallsComponent;
  let fixture: ComponentFixture<TestCallsComponent>;

  beforeEach(waitForAsync(() => {
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
