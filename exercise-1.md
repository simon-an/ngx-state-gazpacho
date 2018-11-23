#  Exercise 1 - Implement SafeItem Actions and Reducer

## 1.1 Install schematics

<https://github.com/ngrx/platform/tree/master/docs/schematics>

```bash
npm install @ngrx/schematics --save-dev

ng config cli.defaultCollection @ngrx/schematics
```

UNIX
```bash
npm install @ngrx/{store,effects,entity,store-devtools} --save
```
WINDOWS
```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools -S
```

## 1.2 Generate the Store

```bash
ng g module root-store —-flat false —-module app.module.ts
ng generate @ngrx/schematics:store State --statePath root-store/state --root --module root-store/root-store.module.ts

```

## 1.3 Add feature SafeItems

```bash
ng g @ngrx/schematics:feature root-store/SafeItem --flat --group --reducers state/index.ts
```

Result:
```
src\app\root-store\                          
├── actions                                  
│   └── safe-item.actions.ts                 
├── effects                                  
│   ├── safe-item.effects.spec.ts            
│   └── safe-item.effects.ts                 
├── reducers                                 
│   ├── safe-item.reducer.spec.ts            
│   └── safe-item.reducer.ts                 
├── root-store.module.ts                     
└── state                                    
    └── index.ts                                                                
```

## 1.4 Add Metareducer Store Freeze, to detect shared state errors during development
- Only needed with ngrx6. When ngrx7 is released it will be included.

```bash
 npm i -D ngrx-store-freeze
```

add to root-store/state/index.ts
```typescript
import { storeFreeze } from 'ngrx-store-freeze';
...
export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
```


### 1.5 Create Safes state in shared module 

- Generate Store Module in Shared Module

```bash
ng generate @ngrx/schematics:store Safe --statePath shared/store/safe/state --module shared/shared.module.ts
ng g @ngrx/schematics:feature shared/store/safe/SafeList --flat --group --reducers state/index.ts
ng g @ngrx/schematics:feature shared/store/safe/Activesafe --flat --group --reducers state/index.ts
```


- State will look like this.

```typescript
export interface State {
  pending: boolean;
  safes: Safe[];
}
```

shared/store/safe/actions/safe-list.actions.ts

```typescript
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

```

shared/store/safe/reducers/safe-list.reducer.ts

```typescript
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

```
### 1,6  Subscribe to State

user/container/userhome/userhome.component.ts
hint:

```typescript
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.safes$ = this.store.pipe(select());
  }
```


### 1.7 Create Spinner

















@Deprecated
### 1.5 Implement Load SafeItems Action

- State will look like this.

```typescript
export interface State {
  pending: boolean;
  items: SafeItem[];
}

```

- Add two more Actions: LoadSageItemSuccess and LoadSafeItemsFailure.

root-store/actions/safe-item.actions.ts

```typescript
import { Action } from '@ngrx/store';
import { SafeItem } from '~core/model';

export enum SafeItemActionTypes {
  LoadSafeItems = '[SafeItem] Load SafeItems',
  LoadSafeItemsSuccess = '[SafeItem] Load SafeItems Success',
  LoadSafeItemsFailure = '[SafeItem] Load SafeItems Failure'
}

export class LoadSafeItems implements Action {
  readonly type = SafeItemActionTypes.LoadSafeItems;
}
export class LoadSafeItemsSuccess implements Action {
  readonly type = SafeItemActionTypes.LoadSafeItemsSuccess;
  constructor(public payload: { items: SafeItem[] }) {}
}
export class LoadSafeItemsFailure implements Action {
  readonly type = SafeItemActionTypes.LoadSafeItemsFailure;
}

export type SafeItemActions = LoadSafeItems | LoadSafeItemsSuccess | LoadSafeItemsFailure;


```

root-store/reducers/safe-item.reducer.ts

```typescript
import { SafeItemActions, SafeItemActionTypes } from '../actions/safe-item.actions';
import { SafeItem } from '~core/model';

export interface State {
  pending: boolean;
  items: SafeItem[];
}

export const initialState: State = {
  pending: false,
  items: []
};

export function reducer(state = initialState, action: SafeItemActions): State {
  switch (action.type) {
    case '[SafeItem] Load SafeItems':
      return state;
    case '[SafeItem] Load SafeItems Success':
      return state;
    case SafeItemActionTypes.LoadSafeItemsFailure:
      return state;
    default:
      return state;
  }
}

```

