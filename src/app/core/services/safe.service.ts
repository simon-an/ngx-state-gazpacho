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
