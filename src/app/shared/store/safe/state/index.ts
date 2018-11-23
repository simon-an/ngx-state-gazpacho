import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import * as fromSafeList from '../reducers/safe-list.reducer';
import * as fromActivesafe from '../reducers/activesafe.reducer';

export interface State {

  safeList: fromSafeList.State;

  activesafe: fromActivesafe.State;
}

export const reducers: ActionReducerMap<State> = {

  safeList: fromSafeList.reducer,

  activesafe: fromActivesafe.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
