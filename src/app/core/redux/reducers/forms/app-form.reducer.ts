/*--------------------IMPORTS-------------------------------------------*/
// NgRx
import { Action, compose } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  updateGroup,
  validate,
  updateArray,
  formGroupReducer,
  addArrayControl,
  removeArrayControl
} from 'ngrx-forms';
import { required, minLength, email } from 'ngrx-forms/validation';
import { 
    App,
    Class,
    Author
 } from '@app/models';


/*--------------------ACTION TYPES--------------------------------------*/
export enum AppFormActionTypes {
  INITIALIZE_FORM = '[App-Form] Initialize form',
  SET_SUBMITTED_APP = '[App-Form] Set submitted value',
  ADD_MODEL = '[App-Form] Add class',
  REMOVE_MODEL = '[App-Form] Remove class'
}

/*--------------------ACTION TYPE CLASSES-------------------------------*/
export class SetSubmittedAppAction implements Action {
  readonly type = AppFormActionTypes.SET_SUBMITTED_APP;
  constructor(public submittedValue: App) {}
}

export class InitializeAppFormAction implements Action {
  readonly type = AppFormActionTypes.INITIALIZE_FORM;
  constructor(public initialValue?: App) {}
}

export class AddClassToAppAction implements Action {
  readonly type = AppFormActionTypes.ADD_MODEL;
  constructor(public classToAdd: Class) {}
}

export class RemoveClassFromAppAction implements Action {
  readonly type = AppFormActionTypes.REMOVE_MODEL;
  constructor(public classToRemove: Class) {}
}

/*--------------------ACTION TYPE IMPLEMENTATION------------------------*/
export type AppFormActions =
  | InitializeAppFormAction
  | SetSubmittedAppAction
  | AddClassToAppAction
  | RemoveClassFromAppAction;

/*--------------------NGRX FORM ID--------------------------------------*/
export const APP_FORM_ID = 'APP_FORM';
export const APP_FORM_SELECTOR = 'appForm';

/*--------------------INITIAL STATE DEFINITION--------------------------*/
// TODO: this to test config from service
export const INITIAL_STATE = createFormGroupState<App>(
  APP_FORM_ID,
  new App()
);

/*--------------------REDUCER-------------------------------------------*/
export function appFormReducer(
  state = INITIAL_STATE,
  action: AppFormActions
) {
  const validateForm = updateGroup<App>({
    appName: validate(required, minLength(4)),
    description: validate(required, minLength(4)),
    generateAngularProject: validate(required),
    author: updateGroup<Author>({
      name: validate(required),
      email: validate(required, email)
    }),
    classes: compose(validate<Array<Class>>(minLength(1)))
    // classVariables: compose(
    //     validate<Array<ClassVariable>>(minLength(1)),
    //     updateArray(
    //         updateGroup<ClassVariable>({
    //             name: validate(required),
    //             type: validate(required)
    //             // decorators
    //         })
    //     )
    // )
  });

  switch (action.type) {
    case AppFormActionTypes.INITIALIZE_FORM:
      const app = action.initialValue || new App();
      return createFormGroupState<App>(
        APP_FORM_ID,
        app
      );
    case AppFormActionTypes.SET_SUBMITTED_APP:
      return action.submittedValue;
    case AppFormActionTypes.ADD_MODEL:
      state = updateGroup<App>(state, {
        classes: addArrayControl<Class>(action.classToAdd)
      });
      break;
    case AppFormActionTypes.REMOVE_MODEL:
      const indexToRemove = state.value.classes.findIndex(
        m => m.id === action.classToRemove.id
      );
      state = updateGroup<App>(state, {
        classes: removeArrayControl(indexToRemove)
      });
      break;
    default:
      state = formGroupReducer(state, action);
  }

  return validateForm(state);
}
