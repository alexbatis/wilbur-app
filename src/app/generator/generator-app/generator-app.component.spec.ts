import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorAppComponent } from './generator-app.component';

describe('GeneratorAppComponent', () => {
  let component: GeneratorAppComponent;
  let fixture: ComponentFixture<GeneratorAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
