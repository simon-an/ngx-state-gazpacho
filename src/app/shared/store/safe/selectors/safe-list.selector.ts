import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSafeList from '../reducers/safe-list.reducer';
import * as fromSafe from '../state';
import { getRouterState } from 'app/root-store/state';
import { Safe } from '~core/model';

export const selectSafeFeature = createFeatureSelector('safe');
export const selectSafeList = createSelector(
  selectSafeFeature,
  (state: fromSafe.State) => state.safeList
);

export const selectSafes = createSelector(
  selectSafeList,
  (state: fromSafeList.State) => state.safes
);

export const selectSafesLoading = createSelector(
  selectSafeList,
  (state: fromSafeList.State) => state.pending
);

export const selectSafeById = createSelector(
  selectSafes,
  getRouterState,
  (safes: Safe[], routerState) => {
    // bad: this is why we want to use entities
    // console.log('selectSafeById', safes, routerState.state);
    return safes.find(safe => safe.id === routerState.state.params['id']);
  }
);
