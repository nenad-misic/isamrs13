import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationActionsComponent } from './room-reservation-actions.component';

describe('RoomReservationActionsComponent', () => {
  let component: RoomReservationActionsComponent;
  let fixture: ComponentFixture<RoomReservationActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
