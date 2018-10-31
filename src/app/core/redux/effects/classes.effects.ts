import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { ClassActionTypes, UpdateClassAction, UpdateAppClassAction, RemoveClassAction, RemoveAppClassAction } from '../reducers';

@Injectable()
export class ClassesEffects {
  constructor(private actions$: Actions<Action>) { }

  @Effect()
  updateModel(): Observable<Action> {
    return this.actions$
      .pipe(
        ofType(ClassActionTypes.UPDATE_CLASS),
        map((action: UpdateClassAction) => action.classToUpdate),
        concatMap(payload => [
          new UpdateAppClassAction(payload)
        ])
      );
  }

  @Effect()
  removeModel(): Observable<Action> {
    return this.actions$
      .pipe(
        ofType(ClassActionTypes.REMOVE_CLASS),
        map((action: RemoveClassAction) => action),
        concatMap(payload => [
          new RemoveAppClassAction(payload.classToRemove)
        ])
      );
  }

}
