import { Action } from '@ngrx/store';

export enum SafeListActionTypes {
  LoadSafeLists = '[SafeList] Load SafeLists'
}

export class LoadSafeLists implements Action {
  readonly type = SafeListActionTypes.LoadSafeLists;
}

export type SafeListActions = LoadSafeLists;
