import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatReservationActionsComponent } from './seat-reservation-actions.component';

describe('SeatReservationActionsComponent', () => {
  let component: SeatReservationActionsComponent;
  let fixture: ComponentFixture<SeatReservationActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatReservationActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatReservationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
