import { ClassesModule } from './classes.module';

describe('ClassesModule', () => {
  let classesModule: ClassesModule;

  beforeEach(() => {
    classesModule = new ClassesModule();
  });

  it('should create an instance', () => {
    expect(ClassesModule).toBeTruthy();
  });
});
