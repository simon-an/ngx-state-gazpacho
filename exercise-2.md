# NGRX Entities

## 1.1 Add SaveItem Entity

```bash
ng g @ngrx/schematics:entity shared/store/safe/SafeItem --group --reducers state/index.ts
```

- remove src/app/shared/store/safe/models/safe-item.model.ts
- import existing model in generated files.

```typescript
import { SafeItem } from '~core/model';
```
- remove items state from safe.service.ts
- add LoadSafeItems action to getItems() of safe.service.ts

```typescript
tap((items: SafeItem[]) => this.store.dispatch(new LoadSafeItems({ safeItems: items }))),
```

<details><summary>SafeService Solution</summary>

import { Injectable } from '@angular/core';
import { Safe, SafeItem } from '../model';
import { Observable, Subject, BehaviorSubject, timer, interval, ReplaySubject, of } from 'rxjs';
import {
  map,
  switchMap,
  switchMapTo,
  tap,
  concatMapTo,
  take,
  startWith,
  shareReplay,
  filter,
  catchError,
  delay
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectSafes, selectSafesLoading } from '~shared/store/safe/selectors/safe-list.selector';
import {
  LoadSafeListsSuccess,
  LoadSafeAfterUserAddItem,
  LoadSafeListsFailure
} from '~shared/store/safe/actions/safe-list.actions';
import { State } from 'app/root-store/state';
import { LoadSafeItems } from '~shared/store/safe/actions/safe-item.actions';

@Injectable({
  providedIn: 'root'
})
export class SafeService {
  private readonly safesUrl = '/api/safes';

  constructor(private http: HttpClient, private store: Store<State>) {
    store
      .pipe(
        select(selectSafesLoading),
        filter(Boolean),
        switchMapTo(this.loadSafes()),
        catchError(err => {
          this.store.dispatch(new LoadSafeListsFailure());
          return of(null);
        }),
        filter(Boolean),
        delay(2000)
      )
      .subscribe(safes => this.store.dispatch(new LoadSafeListsSuccess({ safes: safes })));
  }

  loadSafes(): Observable<Safe[]> {
    return this.http.get(this.safesUrl).pipe(map((safes: Safe[]) => safes));
  }

  addItem(item: SafeItem, safeId: string): Observable<SafeItem> {
    console.log(item, safeId, this.http);
    return this.http.post(this.safesUrl + `/${safeId}/items`, item).pipe(
      map((response: SafeItem) => response),
      tap(x => this.store.dispatch(new LoadSafeAfterUserAddItem()))
    );
  }

  getItems(safeId: string): Observable<SafeItem[]> {
    const result$ = this.http.get(this.safesUrl + `/${safeId}/items`).pipe(
      map((items: SafeItem[]) => items),
      tap((items: SafeItem[]) => this.store.dispatch(new LoadSafeItems({ safeItems: items }))),
      shareReplay(1)
    );
    return result$;
  }
}

</details>

#### What is the current behavior in the store slice 'safeitem'? What is the expected behavior?

## 1.2  Use the safeitems in the safe.component.ts

- this.items$ = this.store.pipe(select(getSafeItems));

