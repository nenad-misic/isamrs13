import { TestBed } from '@angular/core/testing';

import { CarReservationDataService } from './car-reservation-data.service';

describe('CarReservationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarReservationDataService = TestBed.get(CarReservationDataService);
    expect(service).toBeTruthy();
  });
});
