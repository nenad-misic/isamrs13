import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationSearchFormComponent } from './room-reservation-search-form.component';

describe('RoomReservationSearchFormComponent', () => {
  let component: RoomReservationSearchFormComponent;
  let fixture: ComponentFixture<RoomReservationSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
