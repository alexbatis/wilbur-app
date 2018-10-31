import { AppsModule } from './apps.module';

describe('AppsModule', () => {
  let classesModule: AppsModule;

  beforeEach(() => {
    classesModule = new AppsModule();
  });

  it('should create an instance', () => {
    expect(AppsModule).toBeTruthy();
  });
});
