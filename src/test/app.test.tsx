import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import App from '../app.tsx';
import {AppRoute, AuthorizationStatus, NameSpace} from '../const.ts';
import {withStore} from './utils/mock-component.tsx';

describe('Component: App', () => {
  it('should render MainPage for the main route', () => {
    const overrideState = {
      [NameSpace.ApiCommunication]: {
        isLoading: false,
        favorites: [],
        offers: [],
      },
      [NameSpace.UserPreferences]: {
        isAuthLoading: false,
        authorizationStatus: AuthorizationStatus.Auth
      }
    };
    const { withStoreComponent } = withStore(
      <App
        RouterComponent={MemoryRouter}
        routerProps={{ initialEntries: [AppRoute.Main] }}
      />, overrideState);
    render(withStoreComponent);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });


  it('should render LoginPage for the login route', () => {
    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    };
    const { withStoreComponent } = withStore(
      <App
        RouterComponent={MemoryRouter}
        routerProps={{ initialEntries: [AppRoute.Login] }}
      />, overrideState);
    render(withStoreComponent);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render FavoritePage for the favorites route', () => {
    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    };
    const { withStoreComponent } = withStore(
      <App
        RouterComponent={MemoryRouter}
        routerProps={{ initialEntries: [AppRoute.Favorites] }}
      />, overrideState);
    render(withStoreComponent);

    expect(screen.getByTestId('favorite-page')).toBeInTheDocument();
  });

  it('should render OfferPage for the offer route', () => {
    const overrideState = {
      [NameSpace.ApiCommunication]: {
        isLoading: false,
        favorites: [],
        offers: [],
      },
      [NameSpace.UserPreferences]: {
        isAuthLoading: false,
        authorizationStatus: AuthorizationStatus.Auth
      }
    };
    const { withStoreComponent } = withStore(
      <App
        RouterComponent={MemoryRouter}
        routerProps={{ initialEntries: [`${AppRoute.Offer}/1`] }}
      />, overrideState);
    render(withStoreComponent);

    expect(screen.getByTestId('offer-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage for the unknown route', () => {
    const overrideState = {
      [NameSpace.ApiCommunication]: {
        isLoading: false,
        favorites: [],
        offers: [],
      },
      [NameSpace.UserPreferences]: {
        isAuthLoading: false,
        authorizationStatus: AuthorizationStatus.Auth
      }
    };
    const { withStoreComponent } = withStore(
      <App
        RouterComponent={MemoryRouter}
        routerProps={{ initialEntries: ['/some/unknown/route'] }}
      />, overrideState);
    render(withStoreComponent);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
