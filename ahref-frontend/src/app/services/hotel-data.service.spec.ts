import { TestBed } from '@angular/core/testing';

import { HotelDataService } from './hotel-data.service';

describe('HotelDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelDataService = TestBed.get(HotelDataService);
    expect(service).toBeTruthy();
  });
});
