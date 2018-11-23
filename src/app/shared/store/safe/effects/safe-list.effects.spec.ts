import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SafeListEffects } from './safe-list.effects';

describe('SafeListEffects', () => {
  let actions$: Observable<any>;
  let effects: SafeListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SafeListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SafeListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
