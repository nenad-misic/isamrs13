import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceDetailsComponent } from './additional-service-details.component';

describe('AdditionalServiceDetailsComponent', () => {
  let component: AdditionalServiceDetailsComponent;
  let fixture: ComponentFixture<AdditionalServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalServiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
