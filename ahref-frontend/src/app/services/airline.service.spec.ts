import { TestBed } from '@angular/core/testing';

import { AirlineService } from './airline.service';

describe('AirlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirlineService = TestBed.get(AirlineService);
    expect(service).toBeTruthy();
  });
});
