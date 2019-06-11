import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDiscountsComponent } from './hotel-discounts.component';

describe('HotelDiscountsComponent', () => {
  let component: HotelDiscountsComponent;
  let fixture: ComponentFixture<HotelDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
