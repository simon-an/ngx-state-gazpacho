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
    ));
  }
}
