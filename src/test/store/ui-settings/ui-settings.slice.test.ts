import {beforeEach, describe, expect, it} from 'vitest';
import {SortOptionsType} from '../../../components/sort-list/sort-offers.ts';
import {selectCity, setCities, setSortType, uiSettingsSlice} from '../../../store/ui-settings/ui-settings.slice.ts';
import {makeFakeCity} from '../../utils/mocks.ts';

describe('SessionState Slice', () => {
  let initialState: ReturnType<typeof uiSettingsSlice.reducer>;
  beforeEach(() => {
    initialState = uiSettingsSlice.reducer(undefined, { type: '' });
  });

  it('should not change state for unknown action type', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const stateAfterUnknownAction = uiSettingsSlice.reducer(initialState, unknownAction);
    expect(stateAfterUnknownAction).toEqual(initialState);
  });

  it('should handle selectCity', () => {
    const newCity = makeFakeCity();
    const action = selectCity(newCity);
    const state = uiSettingsSlice.reducer(initialState, action);
    expect(state.selectedCity).toEqual(newCity);
  });

  it('should handle setCities', () => {
    const newCities = Array.from({ length: 5 }, makeFakeCity);
    const action = setCities(newCities);
    const state = uiSettingsSlice.reducer(initialState, action);
    expect(state.cities).toEqual(newCities);
  });

  it('should handle setSortType', () => {
    const newSortType = 'LOW_TO_HIGH' as SortOptionsType;
    const action = setSortType(newSortType);
    const state = uiSettingsSlice.reducer(initialState, action);
    expect(state.currentSortType).toBe(newSortType);
  });
});
