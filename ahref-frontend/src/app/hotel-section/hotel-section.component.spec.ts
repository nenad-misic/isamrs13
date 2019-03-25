import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSectionComponent } from './hotel-section.component';

describe('HotelSectionComponent', () => {
  let component: HotelSectionComponent;
  let fixture: ComponentFixture<HotelSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
