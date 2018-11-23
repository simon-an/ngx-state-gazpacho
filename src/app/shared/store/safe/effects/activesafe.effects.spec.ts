import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActivesafeEffects } from './activesafe.effects';

describe('ActivesafeEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivesafeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivesafeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ActivesafeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
