import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarAddFormComponent } from './rentacar-add-form.component';

describe('RentacarAddFormComponent', () => {
  let component: RentacarAddFormComponent;
  let fixture: ComponentFixture<RentacarAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
