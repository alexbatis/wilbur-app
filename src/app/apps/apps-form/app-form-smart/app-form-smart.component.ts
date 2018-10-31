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
import { App, SubmitActionType, Class } from '@app/models';
import { CommonService } from '@providers/index';
import {
  CLASS_FORM_SELECTOR,
  SetSubmittedValueAction,
  // InitializeAppFormAction,
  CLASS_FORM_ID,
  AddMemberVariableAction,
  APPS_SELECTOR,
  CLASSES_SELECTOR,
  AddClassToAppAction,
  RemoveClassFromAppAction
} from '@redux/index';
import { AddAppAction, UpdateAppAction } from '@app/core/redux';
import { APP_FORM_SELECTOR, APP_FORM_ID, SetSubmittedAppAction, InitializeAppFormAction } from '@app/core/redux/reducers/forms/app-form.reducer';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'app-form-smart',
  templateUrl: './app-form-smart.component.html',
  styleUrls: ['./app-form-smart.component.css']
})
export class AppFormSmartComponent implements OnInit {
  /*--------------------MEMBER VARIABLES------------*/
  appFormState$: Observable<FormGroupState<App>>;                         // state of class form
  appsState$: Observable<Array<App>>;                                    // state of defined apps
  submitActionType: SubmitActionType;                                         // action to perform on form submit (create/edit)
  errors = new Array<ValidationError>();                                      // submitted form value errors
  definedClasses: Array<Class>;

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {
    this.appFormState$ = store.pipe(select(s => s[APP_FORM_SELECTOR]));   // state of class form
    this.appsState$ = store.pipe(select(s => s[APPS_SELECTOR]));                  // state of defined apps
    store.pipe(
      select(s => s[CLASSES_SELECTOR]),
      take(1))
      .subscribe(classes => {
        this.definedClasses = classes;
      });                  // state of defined classes
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
        this.router.navigate(['/apps']);                                   // Invalid route param
        break;
    }
  }

  /*--------------------FUNCTIONS-------------------*/
  /* Collect generic observable form submit action */
  submitForm(): Observable<SetSubmittedAppAction> {
    return this.appFormState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => new SetSubmittedAppAction(fs.value))
    );
  }

  /* Create/edit submitted form value */
  async submitApp() {
    this.submitForm().subscribe(async submittedValueAction => {
      const tsApp: App = this.commonService.deserialize(submittedValueAction.submittedValue, App); // deserialize submitted form value
      try {
        await tsApp.validate();                                             // validate submitted form value (class-validator)
        if (this.submitActionType === SubmitActionType.Create)                // determine submitted form value action
          this.store.dispatch(new AddAppAction(tsApp));                   // create class
        else this.store.dispatch(new UpdateAppAction(tsApp));             // update class

        this.router.navigate(['/apps']);                                   // redirect to apps page
      } catch (err) {
        console.log(err);
        this.errors = err;                                                    // scope form value validation errors
        // this.openErrorModal();                                                // display modal with error explanation
      }
    });
  }

  /* Open modal to display error messages regarding submitted form value */
  private openErrorModal() {
    document.getElementById('app-form-error-notification').click();         // TODO : refactor to use ngx-smart-modal
  }

  /* Revert form to its initial state  */
  resetForm() {
    this.store.dispatch(new InitializeAppFormAction());                     // adding course, initialize form with empty course
    this.store.dispatch(new ResetAction(APP_FORM_ID));
  }

  /* Dispatch action to create a new member variable for the class form */
  addNewMemberVariable() {
    this.store.dispatch(new AddMemberVariableAction());
  }

  addClassToApp(classToAdd: Class) {
    this.store.dispatch(new AddClassToAppAction(classToAdd));
  }

  removeClassFromApp(classToRemove: Class) {
    this.store.dispatch(new RemoveClassFromAppAction(classToRemove));
  }

}
