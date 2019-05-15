import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickHotelSectionComponent } from './quick-hotel-section.component';

describe('QuickHotelSectionComponent', () => {
  let component: QuickHotelSectionComponent;
  let fixture: ComponentFixture<QuickHotelSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickHotelSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickHotelSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
