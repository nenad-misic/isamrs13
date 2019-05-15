import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCarSectionViewComponent } from './quick-car-section-view.component';

describe('QuickCarSectionViewComponent', () => {
  let component: QuickCarSectionViewComponent;
  let fixture: ComponentFixture<QuickCarSectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCarSectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCarSectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
