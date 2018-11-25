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

  constructor(public payload: { safeItems: SafeItem[] }) {}
}

export class AddSafeItem implements Action {
  readonly type = SafeItemActionTypes.AddSafeItem;

  constructor(public payload: { safeItem: SafeItem }) {}
}

export class UpsertSafeItem implements Action {
  readonly type = SafeItemActionTypes.UpsertSafeItem;

  constructor(public payload: { safeItem: SafeItem }) {}
}

export class AddSafeItems implements Action {
  readonly type = SafeItemActionTypes.AddSafeItems;

  constructor(public payload: { safeItems: SafeItem[] }) {}
}

export class UpsertSafeItems implements Action {
  readonly type = SafeItemActionTypes.UpsertSafeItems;

  constructor(public payload: { safeItems: SafeItem[] }) {}
}

export class UpdateSafeItem implements Action {
  readonly type = SafeItemActionTypes.UpdateSafeItem;

  constructor(public payload: { safeItem: Update<SafeItem> }) {}
}

export class UpdateSafeItems implements Action {
  readonly type = SafeItemActionTypes.UpdateSafeItems;

  constructor(public payload: { safeItems: Update<SafeItem>[] }) {}
}

export class DeleteSafeItem implements Action {
  readonly type = SafeItemActionTypes.DeleteSafeItem;

  constructor(public payload: { id: string }) {}
}

export class DeleteSafeItems implements Action {
  readonly type = SafeItemActionTypes.DeleteSafeItems;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearSafeItems implements Action {
  readonly type = SafeItemActionTypes.ClearSafeItems;
}

export type SafeItemActions =
  | LoadSafeItems
  | AddSafeItem
  | UpsertSafeItem
  | AddSafeItems
  | UpsertSafeItems
  | UpdateSafeItem
  | UpdateSafeItems
  | DeleteSafeItem
  | DeleteSafeItems
  | ClearSafeItems;
