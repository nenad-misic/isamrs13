import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomProfileComponent } from './room-profile.component';

describe('RoomProfileComponent', () => {
  let component: RoomProfileComponent;
  let fixture: ComponentFixture<RoomProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
