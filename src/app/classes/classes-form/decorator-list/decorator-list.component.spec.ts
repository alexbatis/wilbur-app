import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorListFormComponent } from './decorator-list.component';

describe('DecoratorListFormComponent', () => {
  let component: DecoratorListFormComponent;
  let fixture: ComponentFixture<DecoratorListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoratorListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratorListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
