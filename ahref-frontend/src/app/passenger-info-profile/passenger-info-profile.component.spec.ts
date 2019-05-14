import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerInfoProfileComponent } from './passenger-info-profile.component';

describe('PassengerInfoProfileComponent', () => {
  let component: PassengerInfoProfileComponent;
  let fixture: ComponentFixture<PassengerInfoProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerInfoProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerInfoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
