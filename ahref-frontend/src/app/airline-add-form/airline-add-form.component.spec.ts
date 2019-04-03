import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAddFormComponent } from './airline-add-form.component';

describe('AirlineAddFormComponent', () => {
  let component: AirlineAddFormComponent;
  let fixture: ComponentFixture<AirlineAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
