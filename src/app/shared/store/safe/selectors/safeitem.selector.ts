import * as fromSafeList from './safe-list.selector';
import * as fromSafeItem from '../reducers/safe-item.reducer';
import * as fromSafe from '../state';
import { Safe, SafeItem } from '~core/model';
import { Dictionary } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectSafeFeature = createFeatureSelector<fromSafe.State>('safe');
export const selectSafeItemFeature = createSelector(
  selectSafeFeature,
  (state: fromSafe.State) => state.safeItem
);
export const { selectIds, selectEntities, selectAll, selectTotal } = fromSafeItem.adapter.getSelectors(
  selectSafeItemFeature
);

export const SelectSafeItemMap = createSelector(
  selectSafeItemFeature,
  (state: fromSafeItem.State) => state.safeItemMap
);
export const SafeItemsLoading = createSelector(
  selectSafeItemFeature,
  (state: fromSafeItem.State) => state.loading
);

export const selectItemsBySafeId = createSelector(
  fromSafeList.selectSafeById,
  selectEntities,
  SelectSafeItemMap,
  (safe: Safe, entities: Dictionary<SafeItem>, itemMap: Dictionary<string>): SafeItem[] => {
    // reference in safe
    // return safe.items.map(id => entities[id]);
    // reference in items
    // const filtered2 = Object.keys(entities).reduce(function(filtered, key) {
    //   if (entities[key].safeId === safe.id) {
    //     filtered = [...filtered, entities[key]];
    //   }
    //   return filtered;
    // }, []);
    console.log('selectItemsBySafeId', entities, itemMap, safe.id);
    const itemKeys: string[] = Object.keys(itemMap).filter(key => itemMap[key] === safe.id);
    return itemKeys.map(key => entities[key]);
  }
);
