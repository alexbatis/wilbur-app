import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgonCardComponent } from './argon-card.component';

describe('ArgonCardComponent', () => {
  let component: ArgonCardComponent;
  let fixture: ComponentFixture<ArgonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
