import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFlightProfileComponent } from './quick-flight-profile.component';

describe('QuickFlightProfileComponent', () => {
  let component: QuickFlightProfileComponent;
  let fixture: ComponentFixture<QuickFlightProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickFlightProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickFlightProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
