import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorClassComponent } from './generator-class.component';

describe('GeneratorClassComponent', () => {
  let component: GeneratorClassComponent;
  let fixture: ComponentFixture<GeneratorClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
