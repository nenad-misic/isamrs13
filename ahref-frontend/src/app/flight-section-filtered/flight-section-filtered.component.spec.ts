import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSectionFilteredComponent } from './flight-section-filtered.component';

describe('FlightSectionFilteredComponent', () => {
  let component: FlightSectionFilteredComponent;
  let fixture: ComponentFixture<FlightSectionFilteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSectionFilteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSectionFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
