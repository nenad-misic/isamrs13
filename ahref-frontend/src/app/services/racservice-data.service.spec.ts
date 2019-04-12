import { TestBed } from '@angular/core/testing';

import { RacserviceDataService } from './racservice-data.service';

describe('RacserviceDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RacserviceDataService = TestBed.get(RacserviceDataService);
    expect(service).toBeTruthy();
  });
});
