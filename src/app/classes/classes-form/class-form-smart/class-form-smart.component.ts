/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
// NgRx
import { select, Store } from '@ngrx/store';
import { ResetAction, FormGroupState } from 'ngrx-forms';
import { ValidationError } from 'class-validator';
/*--------------------CUSTOM------------------------*/
import { Class, SubmitActionType } from '@app/models';
import { CommonService } from '@providers/index';
import {
  CLASS_FORM_SELECTOR,
  SetSubmittedValueAction,
  InitializeClassFormAction,
  CLASS_FORM_ID,
  AddMemberVariableAction
} from '@redux/index';
import { AddClassAction, UpdateClassAction } from '@app/core/redux';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'class-form-smart',
  templateUrl: './class-form-smart.component.html',
  styleUrls: ['./class-form-smart.component.css']
})
export class ClassFormSmartComponent implements OnInit {
  /*--------------------MEMBER VARIABLES------------*/
  classFormState$: Observable<FormGroupState<Class>>;                         // state of class form
  classesState$: Observable<Array<Class>>;                                    // state of defined classes
  submitActionType: SubmitActionType;                                         // action to perform on form submit (create/edit)
  errors = new Array<ValidationError>();                                      // submitted form value errors

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {
    this.classFormState$ = store.pipe(select(s => s[CLASS_FORM_SELECTOR]));   // state of class form
    this.classesState$ = store.pipe(select(s => s.classes));                  // state of defined classes
  }

  /*--------------------LIFECYCLE HOOKS-------------*/
  ngOnInit() {
    switch (this.route.params['value']['action']) {                           // Determine form submit action from route params
      case ('new'):
        this.resetForm();                                                  // TODO : enable this for production
        this.submitActionType = SubmitActionType.Create;                      // Creating new class
        break;
      case ('edit'):
        this.submitActionType = SubmitActionType.Edit;                        // Editing existing class
        break;
      default:
        this.router.navigate(['/classes']);                                   // Invalid route param
        break;
    }
  }

  /*--------------------FUNCTIONS-------------------*/
  /* Collect generic observable form submit action */
  submitForm(): Observable<SetSubmittedValueAction> {
    return this.classFormState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => new SetSubmittedValueAction(fs.value))
    );
  }

  /* Create/edit submitted form value */
  async submitClass() {
    this.submitForm().subscribe(async submittedValueAction => {
      const tsClass: Class = this.commonService.deserialize(submittedValueAction.submittedValue, Class); // deserialize submitted form value
      try {
        await tsClass.validate();                                             // validate submitted form value (class-validator)
        if (this.submitActionType === SubmitActionType.Create)                // determine submitted form value action
          this.store.dispatch(new AddClassAction(tsClass));                   // create class
        else this.store.dispatch(new UpdateClassAction(tsClass));             // update class

        this.router.navigate(['/classes']);                                   // redirect to classes page
      } catch (err) {
        console.error(err);
        this.errors = err;                                                    // scope form value validation errors
        this.openErrorModal();                                                // display modal with error explanation
      }
    });
  }

  /* Open modal to display error messages regarding submitted form value */
  private openErrorModal() {
    document.getElementById('class-form-error-notification').click();         // TODO : refactor to use ngx-smart-modal
  }

  /* Revert form to its initial state  */
  resetForm() {
    this.store.dispatch(new InitializeClassFormAction());                     // adding course, initialize form with empty course
    this.store.dispatch(new ResetAction(CLASS_FORM_ID));
  }

  /* Dispatch action to create a new member variable for the class form */
  addNewMemberVariable() {
    this.store.dispatch(new AddMemberVariableAction());
  }

}
