import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAddFormComponent } from './hotel-add-form.component';

describe('HotelAddFormComponent', () => {
  let component: HotelAddFormComponent;
  let fixture: ComponentFixture<HotelAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
