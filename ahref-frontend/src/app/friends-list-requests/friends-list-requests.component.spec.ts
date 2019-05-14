import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListRequestsComponent } from './friends-list-requests.component';

describe('FriendsListRequestsComponent', () => {
  let component: FriendsListRequestsComponent;
  let fixture: ComponentFixture<FriendsListRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsListRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsListRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
