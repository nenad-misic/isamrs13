import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInviteComponent } from './flight-invite.component';

describe('FlightInviteComponent', () => {
  let component: FlightInviteComponent;
  let fixture: ComponentFixture<FlightInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
