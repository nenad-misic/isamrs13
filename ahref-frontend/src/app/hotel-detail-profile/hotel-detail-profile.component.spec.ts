import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailProfileComponent } from './hotel-detail-profile.component';

describe('HotelDetailProfileComponent', () => {
  let component: HotelDetailProfileComponent;
  let fixture: ComponentFixture<HotelDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
