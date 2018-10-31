import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsRootComponent } from './apps-root.component';

describe('AppsRootComponent', () => {
  let component: AppsRootComponent;
  let fixture: ComponentFixture<AppsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
