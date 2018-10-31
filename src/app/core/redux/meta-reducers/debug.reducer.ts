import { ActionReducer } from '@ngrx/store';

export function debugMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const newState = reducer(state, action);
    console.log(`[DEBUG] action: ${action.type}`, {
      payload: (<any>action).payload,
      oldState: state,
      newState
    });
    return newState;
  };
}
