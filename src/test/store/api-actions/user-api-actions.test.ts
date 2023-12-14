import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {beforeEach, describe, expect, it} from 'vitest';
import {APIRoute, AuthorizationStatus, NameSpace} from '../../../const.ts';
import {createAPI} from '../../../services/api.ts';
import * as tokenStorage from '../../../services/token.ts';
import {checkAuthAction, loginAction, logoutAction} from '../../../store/api-actions/user-api-actions.ts';
import {State} from '../../../store/state.ts';
import {setUserAvatarUrl, setUserLogin} from '../../../store/user-preferences/user-preferences.slice.ts';
import {AppThunkDispatch, extractActionsTypes} from '../../utils/mocks.ts';


describe('User API Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthLoading: false,
        isInvalidCredentialsEntered: false,
        userLogin: 'User1',
        userAvatarUrl: 'https://url-to-image/image.png',
      }
    });
  });


  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      const userLogin = 'test@test.com';
      const userAvatarUrl = 'https://url-to-avatar/avatar.png';

      mockAxiosAdapter.onGet(APIRoute.GetLogin).reply(200, {
        email: userLogin,
        avatarUrl: userAvatarUrl,
      });

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        setUserLogin.type,
        setUserAvatarUrl.type,
        checkAuthAction.fulfilled.type,
      ]);

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({type: setUserLogin.type, payload: userLogin}),
          expect.objectContaining({type: setUserAvatarUrl.type, payload: userAvatarUrl}),
        ])
      );
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" if API call fails', async () => {
      mockAxiosAdapter.onGet(APIRoute.GetLogin).reply(500);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });


  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "setUserLogin", "setUserAvatarUrl", and "loginAction.fulfilled" with thunk "loginAction"', async () => {
      const authData = {
        login: 'test@test.com',
        password: '123456',
      };
      const userLogin = authData.login;
      const userAvatarUrl = 'https://url-to-avatar/avatar.png';

      mockAxiosAdapter.onPost(APIRoute.PostLogin).reply(200, {
        email: userLogin,
        avatarUrl: userAvatarUrl,
        token: 'test-token',
      });

      await store.dispatch(loginAction(authData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        setUserLogin.type,
        setUserAvatarUrl.type,
        loginAction.fulfilled.type,
      ]);

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({type: setUserLogin.type, payload: userLogin}),
          expect.objectContaining({type: setUserAvatarUrl.type, payload: userAvatarUrl}),
        ])
      );
    });


    it('should call "saveToken" once with the received token', async () => {
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      const authData = {
        login: 'test@test.com',
        password: '123456',
      };
      const userLogin = authData.login;
      const token = 'test-token';

      mockAxiosAdapter.onPost(APIRoute.PostLogin).reply(200, {
        email: userLogin,
        avatarUrl: 'https://url-to-avatar/avatar.png',
        token: token,
      });

      await store.dispatch(loginAction(authData));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(token);
      mockSaveToken.mockRestore();
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" if API call fails', async () => {
      const authData = {
        login: 'test@test.com',
        password: '123456',
      };

      mockAxiosAdapter.onPost(APIRoute.PostLogin).reply(401);

      await store.dispatch(loginAction(authData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });


  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" and call "dropToken"', async () => {
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      mockAxiosAdapter.onDelete(APIRoute.DeleteLogout).reply(200);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);

      expect(mockDropToken).toBeCalledTimes(1);
      mockDropToken.mockRestore();
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" if API call fails', async () => {
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      mockAxiosAdapter.onDelete(APIRoute.DeleteLogout).networkError();

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);

      expect(mockDropToken).not.toBeCalled();
      mockDropToken.mockRestore();
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" if API call fails', async () => {
      mockAxiosAdapter.onDelete(APIRoute.DeleteLogout).reply(500);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);
    });
  });

});
