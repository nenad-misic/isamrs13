import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSectionFilteredComponent } from './car-section-filtered.component';

describe('CarSectionFilteredComponent', () => {
  let component: CarSectionFilteredComponent;
  let fixture: ComponentFixture<CarSectionFilteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSectionFilteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSectionFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
