import {beforeEach, describe, expect, it} from 'vitest';
import {AuthorizationStatus} from '../../../const.ts';
import {checkAuthAction, loginAction, logoutAction} from '../../../store/api-actions/user-api-actions.ts';
import {
  setInvalidCredentialsEntered,
  setUserAvatarUrl,
  setUserLogin,
  userPreferencesSlice
} from '../../../store/user-preferences/user-preferences.slice.ts';

describe('UserPreferences Slice', () => {
  let initialState: ReturnType<typeof userPreferencesSlice.reducer>;
  beforeEach(() => {
    initialState = userPreferencesSlice.reducer(undefined, { type: '' });
  });

  it('should not change state for unknown action type', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const stateAfterUnknownAction = userPreferencesSlice.reducer(initialState, unknownAction);
    expect(stateAfterUnknownAction).toEqual(initialState);
  });

  it('should handle setInvalidCredentialsEntered', () => {
    const action = setInvalidCredentialsEntered(true);
    const state = userPreferencesSlice.reducer(initialState, action);
    expect(state.isInvalidCredentialsEntered).toEqual(true);
  });

  it('should handle setUserLogin', () => {
    const testLogin = 'testuser@example.com';
    const action = setUserLogin(testLogin);
    const state = userPreferencesSlice.reducer(initialState, action);
    expect(state.userLogin).toEqual(testLogin);
  });

  it('should handle setUserAvatarUrl', () => {
    const testAvatarUrl = 'http://example.com/avatar.jpg';
    const action = setUserAvatarUrl(testAvatarUrl);
    const state = userPreferencesSlice.reducer(initialState, action);
    expect(state.userAvatarUrl).toEqual(testAvatarUrl);
  });

  it('should handle checkAuthAction pending', () => {
    const state = userPreferencesSlice.reducer(initialState, checkAuthAction.pending);
    expect(state.isAuthLoading).toEqual(true);
  });

  it('should handle checkAuthAction rejected', () => {
    const state = userPreferencesSlice.reducer(initialState, checkAuthAction.rejected);
    expect(state.isAuthLoading).toEqual(false);
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });

  it('should handle checkAuthAction fulfilled', () => {
    const state = userPreferencesSlice.reducer(initialState, checkAuthAction.fulfilled);
    expect(state.isAuthLoading).toEqual(false);
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.Auth);
  });

  it('should handle loginAction pending', () => {
    const state = userPreferencesSlice.reducer(initialState, loginAction.pending);
    expect(state.isAuthLoading).toEqual(true);
  });

  it('should handle loginAction rejected', () => {
    const state = userPreferencesSlice.reducer(initialState, loginAction.rejected);
    expect(state.isInvalidCredentialsEntered).toEqual(true);
    expect(state.isAuthLoading).toEqual(false);
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });

  it('should handle loginAction fulfilled', () => {
    const state = userPreferencesSlice.reducer(initialState, loginAction.fulfilled);
    expect(state.isAuthLoading).toEqual(false);
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.Auth);
  });

  it('should handle logoutAction pending', () => {
    const state = userPreferencesSlice.reducer(initialState, logoutAction.pending);
    expect(state.isAuthLoading).toEqual(true);
  });

  it('should handle logoutAction rejected', () => {
    const state = userPreferencesSlice.reducer(initialState, logoutAction.rejected);
    expect(state.isAuthLoading).toEqual(false);
  });

  it('should handle logoutAction fulfilled', () => {
    const state = userPreferencesSlice.reducer(initialState, logoutAction.fulfilled);
    expect(state.isAuthLoading).toEqual(false);
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });
});
