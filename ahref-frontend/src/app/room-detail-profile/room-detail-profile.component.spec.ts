import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailProfileComponent } from './room-detail-profile.component';

describe('RoomDetailProfileComponent', () => {
  let component: RoomDetailProfileComponent;
  let fixture: ComponentFixture<RoomDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
