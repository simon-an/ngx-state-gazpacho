import * as fromSafeList from './safe-list.selector';
import * as fromSafeItem from '../reducers/safe-item.reducer';
import { Safe, SafeItem } from '~core/model';
import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { filter } from 'rxjs/operators';

export const selectItemsBySafeId = createSelector(
  fromSafeList.selectSafeById,
  fromSafeItem.selectEntities,
  (safe: Safe, entities: Dictionary<SafeItem>): SafeItem[] => {
    // reference in safe
    // return safe.items.map(id => entities[id]);
    // reference in items
    // const filtered2 = Object.keys(entities).reduce(function(filtered, key) {
    //   if (entities[key].safeId === safe.id) {
    //     filtered = [...filtered, entities[key]];
    //   }
    //   return filtered;
    // }, []);
  }
);
