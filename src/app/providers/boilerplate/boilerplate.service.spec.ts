import { TestBed, inject } from '@angular/core/testing';

import { BoilerplateService } from './boilerplate.service';

describe('BoilerplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoilerplateService]
    });
  });

  it('should be created', inject([BoilerplateService], (service: BoilerplateService) => {
    expect(service).toBeTruthy();
  }));
});
