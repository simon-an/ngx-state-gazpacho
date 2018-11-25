import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { SafeItem } from '~core/model';
import { SafeItemActions, SafeItemActionTypes } from '../actions/safe-item.actions';

export interface State extends EntityState<SafeItem> {
  // additional entities state properties
  safeItemMap: Dictionary<string>;
  loading: boolean;
}

export const adapter: EntityAdapter<SafeItem> = createEntityAdapter<SafeItem>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  safeItemMap: {},
  loading: false
});

export function reducer(state = initialState, action: SafeItemActions): State {
  switch (action.type) {
    // case SafeItemActionTypes.AddSafeItem: {
    //   return adapter.addOne(action.payload.safeItem, state);
    // }

    // case SafeItemActionTypes.UpsertSafeItem: {
    //   return adapter.upsertOne(action.payload.safeItem, state);
    // }

    case SafeItemActionTypes.AddSafeItems: {
      const updatedMap = {
        ...state.safeItemMap,
        ...action.payload.safeItems
          .map(i => i.id)
          .map(i => {
            return { i: action.payload.safeId };
          })
      };
      const updatedState = { ...state, updatedMap, loading: false };
      return adapter.addMany(action.payload.safeItems, updatedState);
    }

    // case SafeItemActionTypes.UpsertSafeItems: {
    //   return adapter.upsertMany(action.payload.safeItems, state);
    // }

    // case SafeItemActionTypes.UpdateSafeItem: {
    //   return adapter.updateOne(action.payload.safeItem, state);
    // }

    // case SafeItemActionTypes.UpdateSafeItems: {
    //   return adapter.updateMany(action.payload.safeItems, state);
    // }

    // case SafeItemActionTypes.DeleteSafeItem: {
    //   return adapter.removeOne(action.payload.id, state);
    // }

    // case SafeItemActionTypes.DeleteSafeItems: {
    //   return adapter.removeMany(action.payload.ids, state);
    // }

    case SafeItemActionTypes.LoadSafeItems: {
      return { ...state, loading: true };
      // return adapter.addAll(action.payload.safeItems, state);
    }

    // case SafeItemActionTypes.ClearSafeItems: {
    //   return adapter.removeAll(state);
    // }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
