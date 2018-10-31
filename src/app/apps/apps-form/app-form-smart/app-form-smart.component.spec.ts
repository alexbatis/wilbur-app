import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormSmartComponent } from './app-form-smart.component';

describe('AppFormSmartComponent', () => {
  let component: AppFormSmartComponent;
  let fixture: ComponentFixture<AppFormSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFormSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFormSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
