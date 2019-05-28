import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelReportSectionComponent } from './hotel-report-section.component';

describe('HotelReportSectionComponent', () => {
  let component: HotelReportSectionComponent;
  let fixture: ComponentFixture<HotelReportSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelReportSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelReportSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
