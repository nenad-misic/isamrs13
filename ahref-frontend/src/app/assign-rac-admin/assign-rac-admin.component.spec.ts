import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRacAdminComponent } from './assign-rac-admin.component';

describe('AssignRacAdminComponent', () => {
  let component: AssignRacAdminComponent;
  let fixture: ComponentFixture<AssignRacAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRacAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRacAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
