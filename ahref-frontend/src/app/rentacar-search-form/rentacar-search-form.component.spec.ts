import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarSearchFormComponent } from './rentacar-search-form.component';

describe('RentacarSearchFormComponent', () => {
  let component: RentacarSearchFormComponent;
  let fixture: ComponentFixture<RentacarSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
