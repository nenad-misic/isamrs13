import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacReportSectionComponent } from './rac-report-section.component';

describe('RacReportSectionComponent', () => {
  let component: RacReportSectionComponent;
  let fixture: ComponentFixture<RacReportSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacReportSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacReportSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
