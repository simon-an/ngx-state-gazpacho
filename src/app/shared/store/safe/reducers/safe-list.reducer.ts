import { Action } from '@ngrx/store';
import { SafeListActions, SafeListActionTypes } from '../actions/safe-list.actions';
import { Safe } from '~core/model';

export interface State {
  safes: Safe[];
  pending: boolean;
}

export const initialState: State = {
  safes: [],
  pending: false
};

export function reducer(state = initialState, action: SafeListActions): State {
  switch (action.type) {
    case SafeListActionTypes.LoadSafeLists:
      return { ...state, pending: true };
    case '[SafeList] Load SafeLists Success':
      return { safes: [...action.payload.safes], pending: false };
    case SafeListActionTypes.LoadSafeListsFailure:
      return { ...state, pending: false };
    default:
      return state;
  }
}
