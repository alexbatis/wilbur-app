import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxTextInputComponent } from './ngrx-text-input.component';

describe('NgrxTextInputComponent', () => {
  let component: NgrxTextInputComponent;
  let fixture: ComponentFixture<NgrxTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxTextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
