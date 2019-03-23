import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarProfileComponent } from './rentacar-profile.component';

describe('RentacarProfileComponent', () => {
  let component: RentacarProfileComponent;
  let fixture: ComponentFixture<RentacarProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
