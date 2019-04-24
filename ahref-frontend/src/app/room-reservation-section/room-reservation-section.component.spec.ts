import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationSectionComponent } from './room-reservation-section.component';

describe('RoomReservationSectionComponent', () => {
  let component: RoomReservationSectionComponent;
  let fixture: ComponentFixture<RoomReservationSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
