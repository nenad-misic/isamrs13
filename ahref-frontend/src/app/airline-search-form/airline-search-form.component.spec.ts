import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineSearchFormComponent } from './airline-search-form.component';

describe('AirlineSearchFormComponent', () => {
  let component: AirlineSearchFormComponent;
  let fixture: ComponentFixture<AirlineSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
