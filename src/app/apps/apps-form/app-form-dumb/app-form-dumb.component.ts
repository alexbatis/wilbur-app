/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormGroupState } from 'ngrx-forms';
import { App } from '@app/models';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'app-form-dumb',
  templateUrl: './app-form-dumb.component.html',
  styleUrls: ['./app-form-dumb.component.css']
})
export class AppFormDumbComponent implements OnInit {
  /*--------------------MEMBER VARIABLES------------*/
  @ViewChild('classesSelect') classesSelect;
  @Input() formState$: Observable<FormGroupState<App>>;
  @Input() definedClasses: Array<any>;
  selectedClasses = [];

  @Output() submitAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetFormAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() addClassToApp: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeClassFromApp: EventEmitter<any> = new EventEmitter<any>();
  // @Input() errors: Array<any>;
  // @Output() newMemberVariableAction: EventEmitter<any> = new EventEmitter<any>();
  // @Output() addDecoratorAction: EventEmitter<any> = new EventEmitter<any>();
  // @Output() decoratorSelectedAction: EventEmitter<any> = new EventEmitter<any>();

  /*--------------------FUNCTIONS-------------------*/
  // createNewMemberVariable() { this.newMemberVariableAction.emit(); }
  // addDecorator(classVariableId: string) { this.addDecoratorAction.emit(classVariableId); }
  // selectDecorator(decorator) { this.decoratorSelectedAction.emit(decorator); }
  reset() { this.resetFormAction.emit(); }
  submit() { this.submitAction.emit(); }
  trackByIndex(index: number) { return index; }

  onClassAdd(classToAdd) { this.addClassToApp.emit(classToAdd); }
  onClassRemove(classToRemoteEvent) { this.removeClassFromApp.emit(classToRemoteEvent.value); }

  ngOnInit() {
    console.log(this.classesSelect);
    this.formState$.pipe(take(1)).subscribe(state => {
      this.selectedClasses = state.value.classes;
      // console.log(this.selectedClasses);
      //   // this.classesSelect.select(selectedClass);
      //   console.log(selectedClass);
      // });
    })
  }

  compareWithIdk(a,b){
    return true;
  }
}
