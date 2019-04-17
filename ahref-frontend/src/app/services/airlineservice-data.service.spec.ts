import { TestBed } from '@angular/core/testing';

import { AirlineserviceDataService } from './airlineservice-data.service';

describe('AirlineserviceDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirlineserviceDataService = TestBed.get(AirlineserviceDataService);
    expect(service).toBeTruthy();
  });
});
