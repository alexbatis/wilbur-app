import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorFormModalComponent } from './decorator-form-modal.component';

describe('DecoratorFormModalComponent', () => {
  let component: DecoratorFormModalComponent;
  let fixture: ComponentFixture<DecoratorFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoratorFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratorFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
