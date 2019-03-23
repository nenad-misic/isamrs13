import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarSectionComponent } from './rentacar-section.component';

describe('RentacarSectionComponent', () => {
  let component: RentacarSectionComponent;
  let fixture: ComponentFixture<RentacarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
