import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCarProfileComponent } from './quick-car-profile.component';

describe('QuickCarProfileComponent', () => {
  let component: QuickCarProfileComponent;
  let fixture: ComponentFixture<QuickCarProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCarProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
