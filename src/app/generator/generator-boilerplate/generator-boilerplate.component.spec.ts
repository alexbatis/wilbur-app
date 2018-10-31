import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorBoilerplateComponent } from './generator-boilerplate.component';

describe('GeneratorBoilerplateComponent', () => {
  let component: GeneratorBoilerplateComponent;
  let fixture: ComponentFixture<GeneratorBoilerplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorBoilerplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorBoilerplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
