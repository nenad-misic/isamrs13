import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceProfileComponent } from './additional-service-profile.component';

describe('AdditionalServiceProfileComponent', () => {
  let component: AdditionalServiceProfileComponent;
  let fixture: ComponentFixture<AdditionalServiceProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalServiceProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
