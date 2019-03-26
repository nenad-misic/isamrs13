import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDetailProfileComponent } from './airline-detail-profile.component';

describe('AirlineDetailProfileComponent', () => {
  let component: AirlineDetailProfileComponent;
  let fixture: ComponentFixture<AirlineDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
