import { Action } from '@ngrx/store';
import { Safe } from '~core/model';

export enum SafeListActionTypes {
  LoadSafeLists = '[SafeList] Load SafeLists',
  LoadSafeListsSuccess = '[SafeList] Load SafeLists Success',
  LoadSafeListsFailure = '[SafeList] Load SafeLists Failure'
}

export class LoadSafeLists implements Action {
  readonly type = SafeListActionTypes.LoadSafeLists;
}
export class LoadSafeListsSuccess implements Action {
  readonly type = SafeListActionTypes.LoadSafeListsSuccess;
  constructor(public payload: { safes: Safe[] }) {}
}
export class LoadSafeListsFailure implements Action {
  readonly type = SafeListActionTypes.LoadSafeListsFailure;
}

export type SafeListActions = LoadSafeLists | LoadSafeListsSuccess | LoadSafeListsFailure;
