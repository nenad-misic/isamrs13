import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRoomDetailsComponent } from './quick-room-details.component';

describe('QuickRoomDetailsComponent', () => {
  let component: QuickRoomDetailsComponent;
  let fixture: ComponentFixture<QuickRoomDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRoomDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
