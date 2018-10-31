import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { YeomanState, SubmitGeneratorPromptAnswersAction } from '@app/core/redux';
import { Store, select } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  yeomanState$: Observable<YeomanState>;
  answers: object;

  constructor(private store: Store<any>) {
    this.yeomanState$ = store.pipe(select(s => s.yeoman));
    this.answers = {};
  }

  ngOnInit() {
    this.yeomanState$.subscribe((state: YeomanState) => {
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

  submitAnswers() {
    this.store.dispatch(new SubmitGeneratorPromptAnswersAction({ answers: this.answers }));
  }



}
