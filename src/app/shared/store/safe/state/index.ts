import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import * as fromSafeList from '../reducers/safe-list.reducer';
import * as fromSafeItem from '../reducers/safe-item.reducer';

export interface State {
  safeList: fromSafeList.State;
  safeItem: fromSafeItem.State;
}

export const reducers: ActionReducerMap<State> = {
  safeList: fromSafeList.reducer,
  safeItem: fromSafeItem.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
