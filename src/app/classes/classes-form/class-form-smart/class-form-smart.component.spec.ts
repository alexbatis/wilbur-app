import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormSmartComponent } from './class-form-smart.component';

describe('ClassFormSmartComponent', () => {
  let component: ClassFormSmartComponent;
  let fixture: ComponentFixture<ClassFormSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFormSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFormSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
