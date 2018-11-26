import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SafeitemEffects } from './safeitem.effects';

describe('SafeitemEffects', () => {
  let actions$: Observable<any>;
  let effects: SafeitemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SafeitemEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SafeitemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
