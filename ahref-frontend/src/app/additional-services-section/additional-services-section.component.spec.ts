import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServicesSectionComponent } from './additional-services-section.component';

describe('AdditionalServicesSectionComponent', () => {
  let component: AdditionalServicesSectionComponent;
  let fixture: ComponentFixture<AdditionalServicesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalServicesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServicesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
