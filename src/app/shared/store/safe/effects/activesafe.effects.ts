import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActivesafeActionTypes } from '../actions/activesafe.actions';

@Injectable()
export class ActivesafeEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(ActivesafeActionTypes.LoadActivesafes));

  constructor(private actions$: Actions) {}
}
