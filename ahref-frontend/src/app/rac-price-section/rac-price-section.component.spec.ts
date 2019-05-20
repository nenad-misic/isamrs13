import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacPriceSectionComponent } from './rac-price-section.component';

describe('RacPriceSectionComponent', () => {
  let component: RacPriceSectionComponent;
  let fixture: ComponentFixture<RacPriceSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacPriceSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacPriceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
