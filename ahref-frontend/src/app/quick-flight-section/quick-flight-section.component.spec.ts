import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFlightSectionComponent } from './quick-flight-section.component';

describe('QuickFlightSectionComponent', () => {
  let component: QuickFlightSectionComponent;
  let fixture: ComponentFixture<QuickFlightSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickFlightSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickFlightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
