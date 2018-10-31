/*--------------------IMPORTS-------------------------------------------*/
import { Action } from '@ngrx/store'; // NgRx
import { App, Class } from '@models/index'; // CLASSs

/*--------------------ACTION TYPES--------------------------------------*/
export enum AppsActionTypes {
    ADD_APP = '[Apps] Add App',
    REMOVE_APP = '[Apps] Remove App',
    UPDATE_APP = '[Apps] Update App',
    UPDATE_APP_CLASS = '[Apps] Update App Class',
    REMOVE_APP_CLASS = '[Apps] Remove App Class'
}

/*--------------------ACTION TYPE CLASSES-------------------------------*/
/* Create a new app */
export class AddAppAction implements Action {
    readonly type = AppsActionTypes.ADD_APP;
    constructor(public appToAdd: App) { }
}

/* Delete a defined app */
export class RemoveAppAction implements Action {
    readonly type = AppsActionTypes.REMOVE_APP;
    constructor(public appToRemove: App) { }
}

/* Update an app */
export class UpdateAppAction implements Action {
    readonly type = AppsActionTypes.UPDATE_APP;
    constructor(public appToUpdate: App) { }
}

/* Update an app's class */
export class UpdateAppClassAction implements Action {
    readonly type = AppsActionTypes.UPDATE_APP_CLASS;
    constructor(public classToUpdate: Class) { }
}

/* Remove an app's class */
export class RemoveAppClassAction implements Action {
    readonly type = AppsActionTypes.REMOVE_APP_CLASS;
    constructor(public classToRemove: Class) { }
}

/*--------------------ACTION TYPE IMPLEMENTATION------------------------*/
export type AppsActions =
    | AddAppAction
    | RemoveAppAction
    | UpdateAppAction
    | UpdateAppClassAction
    | RemoveAppClassAction;

/*--------------------INITIAL STATE DEFINITION--------------------------*/
const initialState: Array<App> = new Array<App>();
export const APPS_SELECTOR = 'apps';

/*--------------------REDUCER-------------------------------------------*/
export function appsReducer(
    state = initialState,
    action: AppsActions
): Array<App> {
    switch (action.type) {
        case AppsActionTypes.ADD_APP:
            return state.concat(action.appToAdd);                                           // Add new app to state
        case AppsActionTypes.REMOVE_APP:
            return state.filter(application => application.id !== action.appToRemove.id);   // Remove app from state
        case AppsActionTypes.UPDATE_APP:
            return state                                                                    // Filter out app and replace it with updated value
                .filter(application => application.id !== action.appToUpdate.id)
                .concat(action.appToUpdate);
        case AppsActionTypes.UPDATE_APP_CLASS:
            const appToUpdate = state.filter(
                application => application.classes
                    .findIndex(tsClass => tsClass.id === action.classToUpdate.id) !== -1);  // Find class that matches updated class

            for (let i = 0; i < appToUpdate.length; i++) {
                const classIndexToUpdate = appToUpdate[i].classes.findIndex(m => m.id === action.classToUpdate.id);
                appToUpdate[i].classes[classIndexToUpdate] = action.classToUpdate;
                state = state.filter(application => application.id !== appToUpdate[i].id);
            }
            state = state.concat(appToUpdate);
            return state;
        case AppsActionTypes.REMOVE_APP_CLASS:
            const appsToRemoveClass = state.filter(application => application.classes.findIndex(tsClass => tsClass.id === action.classToRemove.id) !== -1);
            for (let i = 0; i < appsToRemoveClass.length; i++) {
                const classIndexToUpdate = appsToRemoveClass[i].classes.findIndex(m => m.id === action.classToRemove.id);
                appsToRemoveClass[i].classes.splice(classIndexToUpdate, 1);
                state = state.filter(application => application.id !== appsToRemoveClass[i].id);
            }
            state = state.concat(appsToRemoveClass);
            return state;
        default:
            return state;
    }
}
