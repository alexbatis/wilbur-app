import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { YeomanState, YEOMAN_SELECTOR, initialYeomanState, PromptDirectoryPathAction, WriteFileAction, SetSelectedGeneratorAction, SubmitGeneratorPromptAnswersAction, RunSelectedGeneratorAction } from '@app/core/redux';
import { takeUntil } from 'rxjs/operators';
import { BoilerplateService } from '../boilerplate/boilerplate.service';
import { App, Class } from '@app/models';
import { YeomanGenerator } from '@app/models/YeomanGenerator';

export enum GeneratorType {
  BOILERPLATE,
  APP,
  MODIFY,
  MODIFY_CLASS,
  REMOVE_CLASS
};

@Injectable({
  providedIn: 'root'
})
export class GeneratorService implements OnInit, OnDestroy {
  private yeomanState$: Observable<YeomanState>;
  private unsubscribe$: Subject<void> = new Subject<void>();                  // unsubscribe subject for canceling subscriptions on service destroy
  private currentState: YeomanState = initialYeomanState;
  private generatorType: GeneratorType;

  constructor(private store: Store<any>,
    public boilerplateService: BoilerplateService) {
    this.yeomanState$ = store.pipe(select(s => s[YEOMAN_SELECTOR]));
    this.yeomanState$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        if (state.promptQuestions !== null && state.promptQuestions !== this.currentState.promptQuestions) {
          this.currentState = state;
          this.promptQuestionsChangeEvent();
        }
        this.currentState = state;
      });
  }

  ngOnInit() {
  }

  setGeneratorType(generatorType: GeneratorType, flags?: string) {
    this.generatorType = generatorType;
    const nodeTsGenerator = this.currentState.installedGenerators.value.find(generator => generator.name === 'generator-wilbur');
    if (nodeTsGenerator) {
      if (generatorType === GeneratorType.BOILERPLATE) {
        const generatorName = (flags) ? `:boilerplate ${flags}` : ":boilerplate";
        const boilerplateGenerator = new YeomanGenerator({
          name: nodeTsGenerator.name + generatorName,
          description: nodeTsGenerator.description,
          isCompatible: nodeTsGenerator.isCompatible,
          officialGenerator: nodeTsGenerator.officialGenerator,
          version: nodeTsGenerator.version
        });
        this.store.dispatch(new SetSelectedGeneratorAction({ selectedGenerator: boilerplateGenerator }));
      }
      else if (generatorType === GeneratorType.APP) {
        const generatorName = (flags) ? ` ${flags}` : "";
        const appGenerator = new YeomanGenerator({
          name: nodeTsGenerator.name + generatorName,
          description: nodeTsGenerator.description,
          isCompatible: nodeTsGenerator.isCompatible,
          officialGenerator: nodeTsGenerator.officialGenerator,
          version: nodeTsGenerator.version
        });
        this.store.dispatch(new SetSelectedGeneratorAction({ selectedGenerator: appGenerator }));
      }
      else if (generatorType === GeneratorType.MODIFY_CLASS) {
        const classGenerator = new YeomanGenerator({
          name: nodeTsGenerator.name + ":add-class",
          description: nodeTsGenerator.description,
          isCompatible: nodeTsGenerator.isCompatible,
          officialGenerator: nodeTsGenerator.officialGenerator,
          version: nodeTsGenerator.version
        });
        this.store.dispatch(new SetSelectedGeneratorAction({ selectedGenerator: classGenerator }));
      }
      else if (generatorType === GeneratorType.REMOVE_CLASS) {
        const classGenerator = new YeomanGenerator({
          name: nodeTsGenerator.name + ":remove-class",
          description: nodeTsGenerator.description,
          isCompatible: nodeTsGenerator.isCompatible,
          officialGenerator: nodeTsGenerator.officialGenerator,
          version: nodeTsGenerator.version
        });
        this.store.dispatch(new SetSelectedGeneratorAction({ selectedGenerator: classGenerator }));
        this.store.dispatch(new RunSelectedGeneratorAction());
      }
    }
  }

  getGeneratorIsInstalled(): boolean {
    if (!this.currentState.installedGenerators || !this.currentState.installedGenerators.value || !this.currentState.installedGenerators.value.length) return false;
    for (let i = 0; i < this.currentState.installedGenerators.value.length; i++)
      if (this.currentState.installedGenerators.value[i].name === 'generator-wilbur') // TODO: replace hardcoded string
        return true;
    return false;
  }

  openDirectoryChooser() {
    this.store.dispatch(new PromptDirectoryPathAction());
  }

  beginBoilerplateGenerator(flags?: string) {
    if (!this.currentState.selectedGenerator || flags !== null)
      this.setGeneratorType(GeneratorType.BOILERPLATE, flags)

    this.store.dispatch(new RunSelectedGeneratorAction());
  }

  beginAppGenerator(app: App, flags?: string) {
    if (!this.currentState.selectedGenerator || flags !== null)
      this.setGeneratorType(GeneratorType.APP, flags)

    this.store.dispatch(new WriteFileAction({
      fileContents: app,
      fileName: 'app.json'
    }));
  }

  beginAddClassGenerator(classToGenerate: Class) {
    if (!this.currentState.selectedGenerator)
      this.setGeneratorType(GeneratorType.MODIFY_CLASS)

    this.store.dispatch(new WriteFileAction({
      fileContents: classToGenerate,
      fileName: 'class.json'
    }));
  }

  beginRemoveClassGenerator() {
    if (!this.currentState.selectedGenerator)
      this.setGeneratorType(GeneratorType.REMOVE_CLASS)
  }

  promptQuestionsChangeEvent() {
    if (this.currentState.promptQuestions.find(question => question.name === 'appConfigurationFilePath')) { // Generating an app
      if (this.generatorType == GeneratorType.BOILERPLATE || this.generatorType == GeneratorType.APP)
        this.store.dispatch(new SubmitGeneratorPromptAnswersAction({
          answers: {
            appConfigurationFilePath: 'app.json'
          }
        }));
    }
    else if (this.currentState.promptQuestions.find(question => question.name === 'classConfigurationFilePath')) { // Generating an app
      if (this.generatorType == GeneratorType.MODIFY_CLASS) {
        console.log('dispatching prompt answers class generator') // this somehow fixes timing issues?
        setTimeout(() => {
          this.store.dispatch(new SubmitGeneratorPromptAnswersAction({
            answers: {
              classConfigurationFilePath: 'class.json',
              type: 'Add/Edit a model'
            }
          }));
        }, 690);
      }
      // 'Remove a model'
    }
  }

  /* Cancel subscriptions on service destroy */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
