import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectorsComponent } from './data-collectors.component';

describe('DataCollectorsComponent', () => {
  let component: DataCollectorsComponent;
  let fixture: ComponentFixture<DataCollectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCollectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCollectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
