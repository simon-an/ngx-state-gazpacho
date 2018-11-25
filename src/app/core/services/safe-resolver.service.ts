import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

import { Safe } from '../model';
import { SafeService } from './safe.service';
import { Store, select } from '@ngrx/store';
import { State } from 'app/root-store/state';
import { selectSafeById } from '~shared/store/safe/selectors/safe-list.selector';

@Injectable({
  providedIn: 'root'
})
export class SafeResolverService implements Resolve<Safe> {
  constructor(private safeService: SafeService, private router: Router, private store: Store<State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Safe> | Observable<never> {
    return this.store.pipe(
      select(selectSafeById),
      take(1),
      tap(safe => console.log('resolve safe', safe)),
      mergeMap(safe => {
        if (safe) {
          return of(safe);
        } else {
          // id not found
          this.router.navigate(['home']);
          return EMPTY;
        }
      })
    );
  }
}
