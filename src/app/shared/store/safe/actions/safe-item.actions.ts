import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { SafeItem } from '~core/model';
export enum SafeItemActionTypes {
  LoadSafeItems = '[SafeItem] Load SafeItems',
  AddSafeItem = '[SafeItem] Add SafeItem',
  UpsertSafeItem = '[SafeItem] Upsert SafeItem',
  AddSafeItems = '[SafeItem] Add SafeItems',
  UpsertSafeItems = '[SafeItem] Upsert SafeItems',
  UpdateSafeItem = '[SafeItem] Update SafeItem',
  UpdateSafeItems = '[SafeItem] Update SafeItems',
  DeleteSafeItem = '[SafeItem] Delete SafeItem',
  DeleteSafeItems = '[SafeItem] Delete SafeItems',
  ClearSafeItems = '[SafeItem] Clear SafeItems'
}

export class LoadSafeItems implements Action {
  readonly type = SafeItemActionTypes.LoadSafeItems;

  constructor(public payload: { safeId: string }) {}
}

export class AddSafeItems implements Action {
  readonly type = SafeItemActionTypes.AddSafeItems;

  constructor(public payload: { safeItems: SafeItem[]; safeId: string }) {}
}

export type SafeItemActions = LoadSafeItems | AddSafeItems;
