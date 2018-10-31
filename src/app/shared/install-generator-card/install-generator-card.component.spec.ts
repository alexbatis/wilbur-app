import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallGeneratorCardComponent } from './install-generator-card.component';

describe('InstallGeneratorCardComponent', () => {
  let component: InstallGeneratorCardComponent;
  let fixture: ComponentFixture<InstallGeneratorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallGeneratorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallGeneratorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
