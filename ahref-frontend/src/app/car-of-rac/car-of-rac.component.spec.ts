import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfRacComponent } from './car-of-rac.component';

describe('CarOfRacComponent', () => {
  let component: CarOfRacComponent;
  let fixture: ComponentFixture<CarOfRacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarOfRacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOfRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
