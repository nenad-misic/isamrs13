import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReservationActionsComponent } from './car-reservation-actions.component';

describe('CarReservationActionsComponent', () => {
  let component: CarReservationActionsComponent;
  let fixture: ComponentFixture<CarReservationActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarReservationActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarReservationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
