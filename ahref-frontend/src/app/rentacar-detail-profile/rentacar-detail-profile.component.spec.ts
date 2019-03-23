import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarDetailProfileComponent } from './rentacar-detail-profile.component';

describe('RentacarDetailProfileComponent', () => {
  let component: RentacarDetailProfileComponent;
  let fixture: ComponentFixture<RentacarDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
