import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSectionComponent } from './car-section.component';

describe('CarSectionComponent', () => {
  let component: CarSectionComponent;
  let fixture: ComponentFixture<CarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
