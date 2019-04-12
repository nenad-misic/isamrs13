import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailProfileComponent } from './car-detail-profile.component';

describe('CarDetailProfileComponent', () => {
  let component: CarDetailProfileComponent;
  let fixture: ComponentFixture<CarDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
