import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightAddFormComponent } from './flight-add-form.component';

describe('FlightAddFormComponent', () => {
  let component: FlightAddFormComponent;
  let fixture: ComponentFixture<FlightAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
