import { TestBed } from '@angular/core/testing';

import { LoggeduserService } from './loggeduser.service';

describe('LoggeduserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggeduserService = TestBed.get(LoggeduserService);
    expect(service).toBeTruthy();
  });
});
