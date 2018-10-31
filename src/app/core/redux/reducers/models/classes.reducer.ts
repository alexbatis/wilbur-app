/*--------------------IMPORTS-------------------------------------------*/
import { Action } from '@ngrx/store';                                           // NgRx
import { Class } from '@models/Class/Class';                                    // Model

/*--------------------ACTION TYPES--------------------------------------*/
export enum ClassActionTypes {
    ADD_CLASS = '[Class] Add class',
    REMOVE_CLASS = '[Class] Remove class',
    UPDATE_CLASS = '[Class] Update class'
}

/*--------------------ACTION TYPE CLASSES-------------------------------*/
/* Create a new class */
export class AddClassAction implements Action {
    readonly type = ClassActionTypes.ADD_CLASS;
    constructor(public classToAdd: Class) { }
}

/* Removes a defined class */
export class RemoveClassAction implements Action {
    readonly type = ClassActionTypes.REMOVE_CLASS;
    constructor(public classToRemove: Class) { }
}

/* Updates a defined class */
export class UpdateClassAction implements Action {
    readonly type = ClassActionTypes.UPDATE_CLASS;
    constructor(public classToUpdate: Class) { }
}

/*--------------------ACTION TYPE IMPLEMENTATION------------------------*/
export type ClassActions =
    | AddClassAction
    | RemoveClassAction
    | UpdateClassAction;


/*--------------------INITIAL STATE DEFINITION--------------------------*/
const initialState: Array<Class> = new Array<Class>();
export const CLASSES_SELECTOR = 'classes';


/*--------------------REDUCER-------------------------------------------*/
export function classesReducer(
    state = initialState,
    action: ClassActions
): Array<Class> {
    switch (action.type) {
        case ClassActionTypes.ADD_CLASS:
            return state.concat(action.classToAdd);                                 // Add class to state
        case ClassActionTypes.REMOVE_CLASS:
            return state.filter(tsClass => tsClass.id !== action.classToRemove.id); // Remove class from state
        case ClassActionTypes.UPDATE_CLASS:
            return state
                .filter(tsClass => tsClass.id !== action.classToUpdate.id)          // Update class
                .concat(action.classToUpdate);
        default:
            return state;
    }
}
