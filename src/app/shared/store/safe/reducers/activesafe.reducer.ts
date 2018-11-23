import { Action } from '@ngrx/store';
import { ActivesafeActions, ActivesafeActionTypes } from '../actions/activesafe.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: ActivesafeActions): State {
  switch (action.type) {

    case ActivesafeActionTypes.LoadActivesafes:
      return state;


    default:
      return state;
  }
}
