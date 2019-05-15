import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFlightDetailProfileComponent } from './quick-flight-detail-profile.component';

describe('QuickFlightDetailProfileComponent', () => {
  let component: QuickFlightDetailProfileComponent;
  let fixture: ComponentFixture<QuickFlightDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickFlightDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickFlightDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
