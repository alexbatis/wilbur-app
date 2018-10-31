import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxSelectInputComponent } from './ngrx-select-input.component';

describe('NgrxSelectInputComponent', () => {
  let component: NgrxSelectInputComponent;
  let fixture: ComponentFixture<NgrxSelectInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxSelectInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
