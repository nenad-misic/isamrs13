import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacBranchOfficeSectionComponent } from './rac-branch-office-section.component';

describe('RacBranchOfficeSectionComponent', () => {
  let component: RacBranchOfficeSectionComponent;
  let fixture: ComponentFixture<RacBranchOfficeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacBranchOfficeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacBranchOfficeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
