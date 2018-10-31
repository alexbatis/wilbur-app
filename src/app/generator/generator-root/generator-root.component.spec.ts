import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorRootComponent } from './generator-root.component';

describe('GeneratorRootComponent', () => {
  let component: GeneratorRootComponent;
  let fixture: ComponentFixture<GeneratorRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
