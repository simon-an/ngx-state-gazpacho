import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromSafeList from '../reducers/safe-list.reducer';
import * as fromSafe from '../state';


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
