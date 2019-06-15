import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHotelAdminComponent } from './assign-hotel-admin.component';

describe('AssignHotelAdminComponent', () => {
  let component: AssignHotelAdminComponent;
  let fixture: ComponentFixture<AssignHotelAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignHotelAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignHotelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
