import { TestBed } from '@angular/core/testing';

import { RoomReservationDataService } from './room-reservation-data.service';

describe('RoomReservationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomReservationDataService = TestBed.get(RoomReservationDataService);
    expect(service).toBeTruthy();
  });
});
