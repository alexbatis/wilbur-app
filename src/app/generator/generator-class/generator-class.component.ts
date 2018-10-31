import { Component, OnInit, OnDestroy } from '@angular/core';
import { YeomanState, APPS_SELECTOR, CLASSES_SELECTOR, SubmitGeneratorPromptAnswersAction } from '@app/core/redux';
import { Observable, Subject } from 'rxjs';
import { GeneratorService, GeneratorType } from '@app/providers/generator/generator.service';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { App, Class } from '@app/models';

enum ClassGeneratorAction {
  REMOVE = "remove",
  ADD_EDIT = "add_edit"
}

@Component({
  selector: 'app-generator-class',
  templateUrl: './generator-class.component.html',
  styleUrls: ['./generator-class.component.scss']
})
export class GeneratorClassComponent implements OnDestroy {
  yeomanState$: Observable<YeomanState>;
  classesState$: Observable<Array<App>>;
  private unsubscribe$: Subject<void> = new Subject<void>();                  // unsubscribe subject for canceling subscriptions on service destroy
  generatorIsInstalled = false;
  generatorRan = false;
  selectedClass: Class;
  classGeneratorAction: ClassGeneratorAction;
  answers = {};

  ngOnInit(): void {
    this.yeomanState$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((state: YeomanState) => {
        if (state.promptQuestions)
          state.promptQuestions.forEach(question => {

            // There's a new question, give it an answer
            if (this.answers[question.name] === undefined) {
              // handle choices first
              if (question.choices && question.choices.length) {
                // this.answers[question.name]['choices'] = question.choices;
                this.answers[question.name] = {};
                this.answers[question.name]['choices'] = [];
                const myChoices = [];
                question.choices.forEach(choice => {
                  myChoices.push({
                    name: choice.name,
                    selected: choice.selected
                  });
                });
                this.answers[question.name]['choices'] = myChoices;
              } else
                this.answers[question.name] = question.default || null;               // basic field with no choics
            }
          });
      });

  }

  constructor(
    private generatorService: GeneratorService,
    private store: Store<any>
  ) {
    this.generatorService.setGeneratorType(GeneratorType.MODIFY);
    this.yeomanState$ = this.store.pipe(select(s => s.yeoman));
    this.classesState$ = this.store.pipe(select(s => s[CLASSES_SELECTOR]));

    this.yeomanState$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        this.generatorIsInstalled = this.generatorService.getGeneratorIsInstalled();
      });
  }

  test() {
    this.selectedClass = null;
    this.classGeneratorAction = null;
  }


  beginClassGenerator() {
    this.generatorRan = true;
    if (this.classGeneratorAction == ClassGeneratorAction.ADD_EDIT)
      this.generatorService.beginAddClassGenerator(this.selectedClass);
    if (this.classGeneratorAction == ClassGeneratorAction.REMOVE)
      this.generatorService.beginRemoveClassGenerator();
  }

  selectClassToRemove() {
    this.store.dispatch(new SubmitGeneratorPromptAnswersAction({
      answers: {
        classNameToRemove: this.answers['classNameToRemove']
      }
    }));
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
