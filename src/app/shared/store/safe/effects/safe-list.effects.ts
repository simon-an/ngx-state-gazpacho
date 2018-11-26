import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SafeListActionTypes } from '../actions/safe-list.actions';

@Injectable()
export class SafeListEffects {
  // @Effect()
  // loadFoos$ = this.actions$.pipe(ofType(SafeListActionTypes.LoadUserSafes, SafeListActionTypes.LoadAdminSafes));

  constructor(private actions$: Actions) {}
}
