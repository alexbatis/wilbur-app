import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormDumbComponent } from './app-form-dumb.component';

describe('AppFormDumbComponent', () => {
  let component: AppFormDumbComponent;
  let fixture: ComponentFixture<AppFormDumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFormDumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFormDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
