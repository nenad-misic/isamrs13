import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightProfileComponent } from './flight-profile.component';

describe('FlightProfileComponent', () => {
  let component: FlightProfileComponent;
  let fixture: ComponentFixture<FlightProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
