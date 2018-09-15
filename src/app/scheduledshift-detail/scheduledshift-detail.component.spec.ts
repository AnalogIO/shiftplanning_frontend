import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledshiftDetailComponent } from './scheduledshift-detail.component';

describe('ScheduledshiftDetailComponent', () => {
  let component: ScheduledshiftDetailComponent;
  let fixture: ComponentFixture<ScheduledshiftDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledshiftDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledshiftDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
