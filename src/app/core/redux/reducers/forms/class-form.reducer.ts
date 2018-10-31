/*--------------------IMPORTS-------------------------------------------*/
// NgRx
import { Action, compose } from '@ngrx/store';
import {
    createFormGroupState,
    updateGroup,
    validate,
    updateArray,
    formGroupReducer,
    addArrayControl,
    removeArrayControl,
    setValue,
    updateArrayWithFilter
} from 'ngrx-forms';
import { required, minLength, pattern } from 'ngrx-forms/validation';
/*--------------------CUSTOM------------------------*/
import {
    Class,
    MemberVariable,
    MemberVariableDecorator,
    MemberVariableDecoratorParam
} from '@app/models';

/*--------------------ACTION TYPES--------------------------------------*/
export enum ClassFormActionTypes {
    INITIALIZE_FORM = '[Class-Form] Initialize form',
    SET_SUBMITTED_VALUE = '[Class-Form] Set submitted value',
    ADD_MEMBER_VARIABLE = '[Class-Form] Add member variable',
    REMOVE_CLASS_VARIABLE = '[Class-Form] Remove member variable',
    ADD_VALIDATION_DECORATOR = '[Class-Form] Add validation decorator',
    UPDATE_VALIDATION_DECORATOR = '[Class-Form] Update validation decorator',
    REMOVE_VALIDATION_DECORATOR = '[Class-Form] Remove validation decorator'
}

/*--------------------ACTION TYPE CLASSES-------------------------------*/
/* Sets value from submitted form */
export class SetSubmittedValueAction implements Action {
    readonly type = ClassFormActionTypes.SET_SUBMITTED_VALUE;
    constructor(public submittedValue: Class) { }
}

/* Initializes form, accepts optional initial state */
export class InitializeClassFormAction implements Action {
    readonly type = ClassFormActionTypes.INITIALIZE_FORM;
    constructor(public initialValue?: Class) { }
}

/* Adds a member variable control to the class form */
export class AddMemberVariableAction implements Action {
    readonly type = ClassFormActionTypes.ADD_MEMBER_VARIABLE;
    constructor() { }
}

/* Removes a member variable control to the class form */
export class RemoveMemberVariableAction implements Action {
    readonly type = ClassFormActionTypes.REMOVE_CLASS_VARIABLE;
    constructor(public id: string) { }
}

/* Removes a validation decorator control to the class form */
export class AddValidationDecoratorAction implements Action {
    readonly type = ClassFormActionTypes.ADD_VALIDATION_DECORATOR;
    constructor(
        public memberVariableId: string,
        public decoratorToAdd?: MemberVariableDecorator
    ) { }
}

/* Updates a validation decorator control */
export class UpdateValidationDecoratorAction implements Action {
    readonly type = ClassFormActionTypes.UPDATE_VALIDATION_DECORATOR;
    constructor(
        public memberVariableId: string,
        public decoratorId: string,
        public newParams: Array<MemberVariableDecoratorParam>,
        public decoratorFormId: string
    ) { }
}

/* Removes a validation decorator control */
export class RemoveValidationDecoratorAction implements Action {
    readonly type = ClassFormActionTypes.REMOVE_VALIDATION_DECORATOR;
    constructor(public memberVariableId: string, public decoratorId: string) { }
}

/*--------------------ACTION TYPE IMPLEMENTATION------------------------*/
export type ClassFormActions =
    | InitializeClassFormAction
    | SetSubmittedValueAction
    | AddMemberVariableAction
    | RemoveMemberVariableAction
    | AddValidationDecoratorAction
    | UpdateValidationDecoratorAction
    | RemoveValidationDecoratorAction;

/*--------------------NGRX FORM ID--------------------------------------*/
export const CLASS_FORM_ID = 'CLASS_FORM';
export const CLASS_FORM_SELECTOR = 'classForm';

/*--------------------INITIAL STATE DEFINITION--------------------------*/
const initialState = createFormGroupState<Class>(CLASS_FORM_ID, new Class());

/*--------------------REDUCER-------------------------------------------*/
export function classFormReducer(
    state = initialState,
    action: ClassFormActions
) {
    // Define form falidation
    const validateForm = updateGroup<Class>({
        name: validate(required, pattern(/\b[A-Z]\w*\b/)),
        memberVariables: compose(
            validate<Array<MemberVariable>>(minLength(1)),
            updateArray(
                updateGroup<MemberVariable>({
                    name: validate(required, pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)),
                    type: validate(required),
                    isArray: validate(required),
                    decorators: compose(
                        validate<Array<MemberVariableDecorator>>(minLength(0)),
                        updateArray(
                            updateGroup<MemberVariableDecorator>({
                                name: validate(required),
                                params: compose(
                                    validate<Array<MemberVariableDecoratorParam>>(minLength(0)),
                                    updateArray(
                                        updateGroup<MemberVariableDecoratorParam>({
                                            name: validate(required)
                                        })
                                    )
                                )
                            })
                        )
                    )
                })
            )
        )
    });

    switch (action.type) {
        case ClassFormActionTypes.INITIALIZE_FORM:
            const tsClass = action.initialValue || new Class();                                         // Set initial state
            state = createFormGroupState<Class>(CLASS_FORM_ID, tsClass);                                // Create form group state from initial state
            break;
        case ClassFormActionTypes.SET_SUBMITTED_VALUE:
            return action.submittedValue;                                                               // Get submitted form value
        case ClassFormActionTypes.ADD_MEMBER_VARIABLE:
            state = updateGroup<Class>(state, {
                memberVariables: addArrayControl<MemberVariable>(new MemberVariable())                  // Create form control for member variables
            });
            break;
        case ClassFormActionTypes.REMOVE_CLASS_VARIABLE:
            const indexToRemove = state.controls.memberVariables.controls
                .findIndex(control => control.value.id === action.id);                                  // Find index of varaiable to remove
            state = updateGroup<Class>(state, {
                memberVariables: removeArrayControl(indexToRemove)                                      // Remove form control
            });
            break;
        case ClassFormActionTypes.ADD_VALIDATION_DECORATOR:
            const decoratorToAdd = (action && action.decoratorToAdd) || new MemberVariableDecorator();  // Create a blank decorator if one isn't provided
            state = updateGroup<Class>(state, {                                                         // Update member variable form group that contains the decorator
                memberVariables: updateArrayWithFilter(
                    cv => cv.value.id === action.memberVariableId,
                    updateGroup<MemberVariable>({
                        decorators: addArrayControl<MemberVariableDecorator>(decoratorToAdd)
                    })
                )
            });
            break;
        case ClassFormActionTypes.REMOVE_VALIDATION_DECORATOR:
            const memberVariableToRemoveDecorator = state.controls.memberVariables.controls             // Find member variable which contains decorator
                .find(classVar => classVar.value.id === action.memberVariableId);
            const indexToRemoveDecorator = memberVariableToRemoveDecorator.controls.decorators.controls // Find where to remove decorator
                .findIndex(decorator => decorator.value.id === action.decoratorId);

            state = updateGroup<Class>(state, {                                                         // Update decorator controls
                memberVariables: updateArrayWithFilter(
                    cv => cv.value.id === action.memberVariableId,
                    updateGroup<MemberVariable>({
                        decorators: removeArrayControl(indexToRemoveDecorator)
                    })
                )
            });
            break;
        case ClassFormActionTypes.UPDATE_VALIDATION_DECORATOR:
            state = updateGroup<Class>(state, {                                                         // Update validation decorator params control
                memberVariables: updateArrayWithFilter(
                    cv => cv.value.id === action.memberVariableId,
                    updateGroup<MemberVariable>({
                        decorators: updateArrayWithFilter(
                            dec => dec.value.id === action.decoratorId,
                            updateGroup<MemberVariableDecorator>({
                                params: setValue<Array<MemberVariableDecoratorParam>>(
                                    action.newParams
                                )
                            })
                        )
                    })
                )
            });
            break;
        default:
            state = formGroupReducer(state, action);
    }

    return validateForm(state);
}
