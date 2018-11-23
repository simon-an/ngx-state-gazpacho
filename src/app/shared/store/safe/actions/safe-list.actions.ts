import { Action } from '@ngrx/store';
import { Safe } from '~core/model';

export enum SafeListActionTypes {
  LoadUserSafes = '[User] Load SafeLists',
  LoadSafeAfterUserAddItem = '[User] Load SafeLists On Items Change',
  LoadAdminSafes = '[Admin] Load SafeLists',
  LoadSafeListsSuccess = '[SafeList] Load SafeLists Success',
  LoadSafeListsFailure = '[SafeList] Load SafeLists Failure'
}

export class LoadUserSafes implements Action {
  readonly type = SafeListActionTypes.LoadUserSafes;
}
export class LoadAdminSafes implements Action {
  readonly type = SafeListActionTypes.LoadAdminSafes;
}
export class LoadSafeAfterUserAddItem implements Action {
  readonly type = SafeListActionTypes.LoadSafeAfterUserAddItem;
}
export class LoadSafeListsSuccess implements Action {
  readonly type = SafeListActionTypes.LoadSafeListsSuccess;
  constructor(public payload: { safes: Safe[] }) {}
}
export class LoadSafeListsFailure implements Action {
  readonly type = SafeListActionTypes.LoadSafeListsFailure;
}

export type SafeListActions = LoadSafeAfterUserAddItem |  LoadUserSafes | LoadAdminSafes | LoadSafeListsSuccess | LoadSafeListsFailure;
