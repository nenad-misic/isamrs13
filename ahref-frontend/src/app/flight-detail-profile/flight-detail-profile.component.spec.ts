import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailProfileComponent } from './flight-detail-profile.component';

describe('FlightDetailProfileComponent', () => {
  let component: FlightDetailProfileComponent;
  let fixture: ComponentFixture<FlightDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
