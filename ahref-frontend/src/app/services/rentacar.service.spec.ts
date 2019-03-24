import { TestBed } from '@angular/core/testing';

import { RentacarService } from './rentacar.service';

describe('RentacarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentacarService = TestBed.get(RentacarService);
    expect(service).toBeTruthy();
  });
});
