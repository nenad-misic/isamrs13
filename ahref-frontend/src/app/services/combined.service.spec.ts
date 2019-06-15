import { TestBed } from '@angular/core/testing';

import { CombinedService } from './combined.service';

describe('CombinedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombinedService = TestBed.get(CombinedService);
    expect(service).toBeTruthy();
  });
});
