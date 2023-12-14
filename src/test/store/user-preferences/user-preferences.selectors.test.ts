import {describe, expect, it} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';
import {
  getAuthorizationStatus,
  getIsAuthLoading,
  getIsInvalidCredentialsEntered,
  getUserAvatarUrl,
  getUserLogin
} from '../../../store/user-preferences/user-preferences.selectors.ts';

describe('UserPreferences selector', () => {
  const state = {
    [NameSpace.UserPreferences]: {
      authorizationStatus: AuthorizationStatus.Auth,
      isAuthLoading: false,
      isInvalidCredentialsEntered: false,
      userLogin: 'User1',
      userAvatarUrl: 'https://url-to-image/image.png',
    }
  };

  it('should return Authorization Status from state', () => {
    const {authorizationStatus} = state[NameSpace.UserPreferences];
    const result = getAuthorizationStatus(state);
    expect(result).toEqual(authorizationStatus);
  });

  it('should return IsAuthLoading from state', () => {
    const {isAuthLoading} = state[NameSpace.UserPreferences];
    const result = getIsAuthLoading(state);
    expect(result).toEqual(isAuthLoading);
  });

  it('should return isInvalidCredentialsEntered from state', () => {
    const {isInvalidCredentialsEntered} = state[NameSpace.UserPreferences];
    const result = getIsInvalidCredentialsEntered(state);
    expect(result).toEqual(isInvalidCredentialsEntered);
  });

  it('should return user Login from state', () => {
    const {userLogin} = state[NameSpace.UserPreferences];
    const result = getUserLogin(state);
    expect(result).toEqual(userLogin);
  });

  it('should return user Avatar Url from state', () => {
    const {userAvatarUrl} = state[NameSpace.UserPreferences];
    const result = getUserAvatarUrl(state);
    expect(result).toEqual(userAvatarUrl);
  });
});
