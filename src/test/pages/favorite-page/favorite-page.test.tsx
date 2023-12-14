import {render, screen} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../../const';
import FavoritePage from '../../../pages/favorite-page/favorite-page.tsx';
import {withStore} from '../../utils/mock-component';
import {makeFakeBriefOffer} from '../../utils/mocks';

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => children,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Page: FavoritePage', () => {
  it('should render empty favorites page when no favorites', () => {

    const overrideState = {
      [NameSpace.ApiCommunication]: {
        favorites: [],
      },
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
      }
    };
    const { withStoreComponent } = withStore(<FavoritePage />, overrideState);
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.queryByTestId('favorite-list')).toBeNull();
  });

  it('should render favorites list when there are favorites', () => {
    const fakeFavorites = [makeFakeBriefOffer(), makeFakeBriefOffer()];
    const overrideState = {
      [NameSpace.ApiCommunication]: {
        favorites: fakeFavorites,
      },
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
      }
    };
    const { withStoreComponent } = withStore(<FavoritePage />, overrideState);
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.queryByText('Nothing yet saved.')).toBeNull();
    expect(screen.getByTestId('favorite-page')).toBeInTheDocument();
  });
});
