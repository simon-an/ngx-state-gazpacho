import { Action } from '@ngrx/store';
import { SafeListActions, SafeListActionTypes } from '../actions/safe-list.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: SafeListActions): State {
  switch (action.type) {

    case SafeListActionTypes.LoadSafeLists:
      return state;


    default:
      return state;
  }
}
