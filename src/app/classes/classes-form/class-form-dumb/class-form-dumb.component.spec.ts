import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormDumbComponent } from './class-form-dumb.component';

describe('ClassFormDumbComponent', () => {
  let component: ClassFormDumbComponent;
  let fixture: ComponentFixture<ClassFormDumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFormDumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFormDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
