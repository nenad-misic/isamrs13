import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInviteProfileComponent } from './flight-invite-profile.component';

describe('FlightInviteProfileComponent', () => {
  let component: FlightInviteProfileComponent;
  let fixture: ComponentFixture<FlightInviteProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightInviteProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInviteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
