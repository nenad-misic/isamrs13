import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailProfileComponent } from './users-detail-profile.component';

describe('UsersDetailProfileComponent', () => {
  let component: UsersDetailProfileComponent;
  let fixture: ComponentFixture<UsersDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
