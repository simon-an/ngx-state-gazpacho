import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import * as fromSafeList from '../reducers/safe-list.reducer';

export interface State {
  safeList: fromSafeList.State;
}

export const reducers: ActionReducerMap<State> = {
  safeList: fromSafeList.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
