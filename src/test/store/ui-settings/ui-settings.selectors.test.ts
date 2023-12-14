import {describe, expect, it} from 'vitest';
import {SortOptionsType} from '../../../components/sort-list/sort-offers.ts';
import {NameSpace} from '../../../const.ts';
import {getCities, getCurrentSortType, getSelectedCity} from '../../../store/ui-settings/ui-settings.selectors.ts';
import {makeFakeCity} from '../../utils/mocks.ts';

describe('SessionState selector', () => {
  const state = {
    [NameSpace.SessionState]: {
      selectedCity: makeFakeCity(),
      isCitySelected: false,
      cities: Array.from({ length: 5 }, () => makeFakeCity()),
      currentSortType: 'POPULAR' as SortOptionsType,
    }
  };

  it('should return selected city from state', () => {
    const {selectedCity} = state[NameSpace.SessionState];
    const result = getSelectedCity(state);
    expect(result).toEqual(selectedCity);
  });

  it('should return cities from state', () => {
    const {cities} = state[NameSpace.SessionState];
    const result = getCities(state);
    expect(result).toEqual(cities);
  });

  it('should return current sort type from state', () => {
    const {currentSortType} = state[NameSpace.SessionState];
    const result = getCurrentSortType(state);
    expect(result).toEqual(currentSortType);
  });
});
