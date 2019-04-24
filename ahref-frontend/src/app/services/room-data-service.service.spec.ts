import { TestBed } from '@angular/core/testing';

import { RoomDataServiceService } from './room-data-service.service';

describe('RoomDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomDataServiceService = TestBed.get(RoomDataServiceService);
    expect(service).toBeTruthy();
  });
});
