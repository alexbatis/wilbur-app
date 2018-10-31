/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'class-form-dumb',
  templateUrl: './class-form-dumb.component.html',
  styleUrls: ['./class-form-dumb.component.css']
})
export class ClassFormDumbComponent {
  /*--------------------MEMBER VARIABLES------------*/
  @Input() formState$: Observable<any>;
  @Input() definedClasses: Array<any>;
  @Input() errors: Array<any>;
  @Output() submitAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() newMemberVariableAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() addDecoratorAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetFormAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() decoratorSelectedAction: EventEmitter<any> = new EventEmitter<any>();

  /*--------------------FUNCTIONS-------------------*/
  createNewMemberVariable() { this.newMemberVariableAction.emit(); }
  addDecorator(classVariableId: string) { this.addDecoratorAction.emit(classVariableId); }
  selectDecorator(decorator) { this.decoratorSelectedAction.emit(decorator); }
  reset() { this.resetFormAction.emit(); }
  submit() { this.submitAction.emit(); }
  trackByIndex(index: number) { return index; }
}
