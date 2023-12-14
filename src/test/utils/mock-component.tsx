import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Action, DeepPartial} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import {ReactElement} from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api.ts';
import {State} from '../../store/state.ts';
import {completeInitialState} from './mock-state.ts';
import {AppThunkDispatch} from './mocks.ts';

interface ComponentWithMockStore {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(component: ReactElement, overrideState: DeepPartial<State> = {}): ComponentWithMockStore {
  const initialState = { ...completeInitialState, ...overrideState };
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

