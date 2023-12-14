import {NameSpace} from '../../const.ts';
import {State} from '../state.ts';

export const getAuthorizationStatus = (state: Pick<State, typeof NameSpace.UserPreferences>) => state[NameSpace.UserPreferences].authorizationStatus;
export const getIsAuthLoading = (state: Pick<State, typeof NameSpace.UserPreferences>) => state[NameSpace.UserPreferences].isAuthLoading;
export const getIsInvalidCredentialsEntered = (state: Pick<State, typeof NameSpace.UserPreferences>) => state[NameSpace.UserPreferences].isInvalidCredentialsEntered;
export const getUserLogin = (state: Pick<State, typeof NameSpace.UserPreferences>) => state[NameSpace.UserPreferences].userLogin;
export const getUserAvatarUrl = (state: Pick<State, typeof NameSpace.UserPreferences>) => state[NameSpace.UserPreferences].userAvatarUrl;
