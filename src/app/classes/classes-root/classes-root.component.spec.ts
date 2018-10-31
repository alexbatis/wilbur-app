import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesRootComponent } from './classes-root.component';

describe('ClassesRootComponent', () => {
  let component: ClassesRootComponent;
  let fixture: ComponentFixture<ClassesRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
