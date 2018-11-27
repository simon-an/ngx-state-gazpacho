# Exercise 1 - Implement SafeItem Actions and Reducer

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

## 1.5 Create Safes state in shared module

- Generate Store Module in Shared Module

```bash
ng generate @ngrx/schematics:store Safe --statePath shared/store/safe/state --module shared/shared.module.ts
ng g @ngrx/schematics:feature shared/store/safe/SafeList --flat --group --reducers state/index.ts
ng g @ngrx/schematics:feature shared/store/safe/Activesafe --flat --group --reducers state/index.ts
```

- State for safe-list.reducer will look like this.

```typescript
export interface State {
  pending: boolean;
  safes: Safe[];
}
```

Add action events to shared/store/safe/actions/safe-list.actions.ts:

- Add action event "Load SafeLists" from Source "Admin".
- Add action event "Load SafeLists Success" from Source "Safe API".
- Add action event "Load SafeLists Failure" from "Safe API"

<details><summary>Solution shared/store/safe/actions/safe-list.actions.ts</summary>

```typescript
import { Action } from '@ngrx/store';
import { Safe } from '~core/model';

export enum SafeListActionTypes {
  LoadUserSafes = '[User] Load SafeLists',
  LoadAdminSafes = '[Admin] Load SafeLists',
  LoadSafeListsSuccess = '[Safe API] Load SafeLists Success',
  LoadSafeListsFailure = '[Safe API] Load SafeLists Failure'
}

export class LoadUserSafes implements Action {
  readonly type = SafeListActionTypes.LoadUserSafes;
}
export class LoadAdminSafes implements Action {
  readonly type = SafeListActionTypes.LoadAdminSafes;
}
export class LoadSafeListsSuccess implements Action {
  readonly type = SafeListActionTypes.LoadSafeListsSuccess;
  constructor(public payload: { safes: Safe[] }) {}
}
export class LoadSafeListsFailure implements Action {
  readonly type = SafeListActionTypes.LoadSafeListsFailure;
}

export type SafeListActions = LoadUserSafes | LoadAdminSafes | LoadSafeListsSuccess | LoadSafeListsFailure;
```

</details>

Add action types to reducer shared/store/safe/reducers/safe-list.reducer.ts

<details><summary>Solution shared/store/safe/reducers/safe-list.reducer.ts</summary>

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
    case SafeListActionTypes.LoadUserSafes:
    case SafeListActionTypes.LoadAdminSafes:
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

</details>

## 1.6  Subscribe to State

- create selector in shared/store/safe/selectors/safe-list.selector.ts

```typescript
import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromSafeList from '../reducers/safe-list.reducer';
import * as fromSafe from '../state';

export const selectSafeFeature = createFeatureSelector('safe');
export const selectSafeList = createSelector(
  selectSafeFeature,
  (state: fromSafe.State) => state.safeList
);

```

Add selectors "selectSafes" and "selectSafesLoading".

<details><summary>Solution shared/store/safe/selectors/safe-list.selector.ts</summary>

```typescript
import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromSafeList from '../reducers/safe-list.reducer';
import * as fromSafe from '../state';

export const selectSafeFeature = createFeatureSelector('safe');
export const selectSafeList = createSelector(
  selectSafeFeature,
  (state: fromSafe.State) => state.safeList
);

export const selectSafes = createSelector(
  selectSafeList,
  (state: fromSafeList.State) => state.safes
);

export const selectSafesLoading = createSelector(
  selectSafeList,
  (state: fromSafeList.State) => state.pending
);

```

</details>

In user/container/userhome/userhome.component.ts add "selectSafes" and "selectSafesLoading" selector and dispatch the LoadUserSafes action.
Hint: dont remove safe service from constructor, to make sure it is provided.

<details><summary>Solution user/container/userhome/userhome.component.ts</summary>

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Safe, SafeService } from 'app/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '~shared/store/safe/state';
import { selectSafesLoading, selectSafes } from '~shared/store/safe/selectors/safe-list.selector';
import { LoadUserSafes } from '~shared/store/safe/actions/safe-list.actions';

@Component({
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHomeComponent implements OnInit {
  safes$: Observable<Safe[]>;
  pending$: Observable<boolean>;

  constructor(private store: Store<State>, private safeService: SafeService) {}

  ngOnInit() {
    this.pending$ = this.store.pipe(select(selectSafesLoading));
    this.safes$ = this.store.pipe(select(selectSafes));
    this.store.dispatch(new LoadUserSafes());
  }
}

```

</details>

No Safes are loaded yet. So lets add a Spinner.

## 1.7 Create Spinner

add to userhome.component.html

```html
<mat-spinner *ngIf="pending$| async"></mat-spinner>
```

## 1.8 Modify safes in store

- remove the safe state from SafeService
- remove the getSafes method from SafeService
- change the getSafe method in SaveService to subsrcibe to safes in store.

```typescript
getSafe(safeId: string): Observable<Safe> {
  return this.store.pipe(select(selectSafes), map(safes1 => safes1.find(safe => safe.id === safeId)));
}
```

- in refreshItems2 trigger a LoadSaves

```typescript
this.store.dispatch(new LoadSafeAfterUserAddItem());
```

- Fix admin-safes-resolver.service.ts

hint: use store LodaAdminSafes Action and subscribe to state.
hint: make sure you return a cold observable as a result of resolve()
hint: dont remove safe service from constructor, to make sure it is provided.

```typescript
import { Safe } from '~core/model';
import { SafeService } from '~core/services';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectSafes } from '~shared/store/safe/selectors/safe-list.selector';
import { LoadAdminSafes } from '~shared/store/safe/actions/safe-list.actions';
import { State } from 'app/root-store/state';
import { take, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminSafesResolverService implements Resolve<Safe[]> {
  constructor(private store: Store<State>, safeService: SafeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.store.dispatch(new LoadAdminSafes());
    return this.store.pipe(
      select(selectSafes),
      filter(data => !!data && data.length > 0),
      take(1),
      tap((data => console.log('AdminSafesResolverService', data))
    );
  }
}


```

- Safe Service Solution

```typescript
import { Injectable } from '@angular/core';
import { Safe, SafeItem } from '../model';
import { Observable, Subject, BehaviorSubject, timer, interval, ReplaySubject, of } from 'rxjs';
import { map, switchMap, switchMapTo, tap, concatMapTo, take, startWith, shareReplay, filter, catchError, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectSafes, selectSafesLoading } from '~shared/store/safe/selectors/safe-list.selector';
import { LoadSafeListsSuccess, LoadSafeAfterUserAddItem, LoadSafeListsFailure } from '~shared/store/safe/actions/safe-list.actions';
import { State } from 'app/root-store/state';

@Injectable({
  providedIn: 'root'
})
export class SafeService {
  private readonly safesUrl = '/api/safes';
  private readonly itemsUrl = '/api/items';

  private items: ReplaySubject<SafeItem[]> = new ReplaySubject<SafeItem[]>();
  constructor(private http: HttpClient, private store: Store<State>) {

    store
      .pipe(
        select(selectSafesLoading),
        filter(Boolean),
        switchMapTo(this.loadSafes()),
        catchError(err =>  {
          this.store.dispatch(new LoadSafeListsFailure());
          return of(null);
        }),
        filter(Boolean),
        delay(2000)
      )
      .subscribe(safes => this.store.dispatch(new LoadSafeListsSuccess({safes: safes})));
  }

  getSafe(safeId: string): Observable<Safe> {
    return this.store.pipe(select(selectSafes), map(safes1 => safes1.find(safe => safe.id === safeId)));
  }

  loadSafes(): Observable<Safe[]> {
    return this.http.get(this.safesUrl).pipe(map((safes: Safe[]) => safes));
  }

  addItem(item: SafeItem, safeId: string): Observable<SafeItem> {
    console.log(item, safeId, this.http);
    // const newItems = [...this.items.getValue(), item];
    // this.items.next(newItems);
    return this.http.post(this.safesUrl + `/${safeId}/items`, item).pipe(
      map((response: SafeItem) => response),
      tap(x => this.store.dispatch(new LoadSafeAfterUserAddItem()))
      // tap(item => this.refreshItems(safeId)),
      // tap(response => this.refreshItems2(response)),
      // take(1)
    );
  }

  getItems(safeId: string): Observable<SafeItem[]> {
    const result$ = this.http.get(this.safesUrl + `/${safeId}/items`).pipe(
      map((items: SafeItem[]) => items),
      shareReplay(1)
    );
    result$.subscribe(this.items);
    return result$;
  }

}

```

## 1.9 Add Router-State to root-store

- add @ngrx/router-store

```bash
npm i -S @ngrx/router-store
```

- custom serializer for secondary router state root-store/router-serializer.ts

```typescript
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  constructor() {}

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.children.length > 0) {
      if (route.children.length > 1) {
        route = route.children.find(r => (!!r.params && !!r.params.id) || r.outlet === 'secondary');
      }
      if (!route || route.children.length === 1) {
        route = route.firstChild;
      }
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}


```

- add to root-store.module.ts

```typescript
...

imports: [
...
  StoreRouterConnectingModule.forRoot({
        stateKey: 'router'
  })
],

...

providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]

```

- Add the router state selector and router reducert to root-store/state.index.ts

add routerReducer to ActionReducerMap
add selector for router state

```typescript
export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};
...
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
...
```

### 1.10 Resolver should use selector to get SafeById from Store

- remove getSafe() from safe.service.ts 
- replace call of getSafe() in core/services/safe-resolver.service.ts with

```typescript
select(selectSafeById)
```

Selector Solution:

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSafeList from '../reducers/safe-list.reducer';
import * as fromSafe from '../state';
import { getRouterState } from 'app/root-store/state';
import { Safe } from '~core/model';

export const selectSafeFeature = createFeatureSelector('safe');
export const selectSafeList = createSelector(
  selectSafeFeature,
  (state: fromSafe.State) => state.safeList
);

export const selectSafes = createSelector(
  selectSafeList,
  (state: fromSafeList.State) => state.safes
);

export const selectSafesLoading = createSelector(
  selectSafeList,
  (state: fromSafeList.State) => state.pending
);

export const selectSafeById = createSelector(
  selectSafes,
  getRouterState,
  (safes: Safe[], routerState) => {
    // bad: this is why we want to use entities
    // console.log('selectSafeById', safes, routerState.state);
    return safes.find(safe => safe.id === routerState.state.params['id']);
  }
);

```
