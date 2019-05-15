import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCarSectionComponent } from './quick-car-section.component';

describe('QuickCarSectionComponent', () => {
  let component: QuickCarSectionComponent;
  let fixture: ComponentFixture<QuickCarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCarSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
