import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacReservationSearchFormComponent } from './rac-reservation-search-form.component';

describe('RacReservationSearchFormComponent', () => {
  let component: RacReservationSearchFormComponent;
  let fixture: ComponentFixture<RacReservationSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacReservationSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacReservationSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
