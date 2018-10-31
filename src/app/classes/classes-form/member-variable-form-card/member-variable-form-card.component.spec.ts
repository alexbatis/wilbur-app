import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberVariableFormCardComponent } from './member-variable-form-card.component';

describe('MemberVariableFormCardComponent', () => {
  let component: MemberVariableFormCardComponent;
  let fixture: ComponentFixture<MemberVariableFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberVariableFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberVariableFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
