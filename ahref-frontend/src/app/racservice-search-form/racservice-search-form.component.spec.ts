import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacserviceSearchFormComponent } from './racservice-search-form.component';

describe('RacserviceSearchFormComponent', () => {
  let component: RacserviceSearchFormComponent;
  let fixture: ComponentFixture<RacserviceSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacserviceSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacserviceSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
