import { TestBed } from '@angular/core/testing';

import { WsFriendsService } from './ws-friends.service';

describe('WsFriendsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WsFriendsService = TestBed.get(WsFriendsService);
    expect(service).toBeTruthy();
  });
});
