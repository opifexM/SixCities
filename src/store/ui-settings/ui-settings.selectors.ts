import {NameSpace} from '../../const.ts';
import {State} from '../state.ts';

export const getSelectedCity = (state: Pick<State, typeof NameSpace.SessionState>) => state[NameSpace.SessionState].selectedCity;
export const getIsCitySelected = (state: Pick<State, typeof NameSpace.SessionState>) => state[NameSpace.SessionState].isCitySelected;
export const getCities = (state: Pick<State, typeof NameSpace.SessionState>) => state[NameSpace.SessionState].cities;
export const getCurrentSortType = (state: Pick<State, typeof NameSpace.SessionState>) => state[NameSpace.SessionState].currentSortType;
