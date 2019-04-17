import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceAddFormComponent } from './additional-service-add-form.component';

describe('AdditionalServiceAddFormComponent', () => {
  let component: AdditionalServiceAddFormComponent;
  let fixture: ComponentFixture<AdditionalServiceAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalServiceAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServiceAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
