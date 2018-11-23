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
