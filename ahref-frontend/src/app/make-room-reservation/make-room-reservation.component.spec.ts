import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRoomReservationComponent } from './make-room-reservation.component';

describe('MakeRoomReservationComponent', () => {
  let component: MakeRoomReservationComponent;
  let fixture: ComponentFixture<MakeRoomReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeRoomReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
