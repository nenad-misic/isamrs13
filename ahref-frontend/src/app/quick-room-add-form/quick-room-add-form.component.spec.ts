import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRoomAddFormComponent } from './quick-room-add-form.component';

describe('QuickRoomAddFormComponent', () => {
  let component: QuickRoomAddFormComponent;
  let fixture: ComponentFixture<QuickRoomAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRoomAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRoomAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
