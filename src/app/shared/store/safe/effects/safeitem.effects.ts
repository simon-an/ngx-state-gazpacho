import { selectSafeById } from '~shared/store/safe/selectors/safe-list.selector';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
// There are multiple options how to import actions
// import { SafeItemActionTypes, LoadSafeItems, AddSafeItems } from '../actions/safe-item.actions';
import * as fromSafeItem from '../actions/safe-item.actions';
import { exhaustMap, catchError, map, withLatestFrom, filter, delay } from 'rxjs/operators';
import { SafeService } from '~core/services';
import { SafeItem, Safe } from '~core/model';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'app/root-store/state';

@Injectable()
export class SafeitemEffects {
  constructor(private actions$: Actions, private safeService: SafeService, private store: Store<State>) {}

  @Effect()
  loadItems$ = this.actions$.pipe(
    ofType(fromSafeItem.SafeItemActionTypes.LoadSafeItems),
    filter((action: fromSafeItem.LoadSafeItems) => !!action.payload && !!action.payload.safeId),
    exhaustMap((action: fromSafeItem.LoadSafeItems) => this.safeService.getItems(action.payload.safeId)),
    catchError(err => of([])),
    // get safeId from store slice router
    withLatestFrom(
      this.store.pipe(
        select(selectSafeById),
        filter((safe: Safe) => !!safe && !!safe.id),
        map(safe => safe.id)
      )
    ),
    // catchError(err => of(new ErrorActon())),
    map(([items, safeId]: [SafeItem[], string]) => new fromSafeItem.AddSafeItems({ safeItems: items, safeId: safeId }))
  );
}
