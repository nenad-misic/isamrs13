import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeCarReservationComponent } from './make-car-reservation.component';

describe('MakeCarReservationComponent', () => {
  let component: MakeCarReservationComponent;
  let fixture: ComponentFixture<MakeCarReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeCarReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
