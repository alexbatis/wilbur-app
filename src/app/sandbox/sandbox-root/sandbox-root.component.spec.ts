import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxRootComponent } from './sandbox-root.component';

describe('SandboxRootComponent', () => {
  let component: SandboxRootComponent;
  let fixture: ComponentFixture<SandboxRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
