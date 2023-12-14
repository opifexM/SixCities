import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import NavigationMenu from '../../../components/navigation-menu/navigation-menu.tsx';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';
import {withStore} from '../../utils/mock-component';
import {makeFakeBriefOffer} from '../../utils/mocks.ts';

describe('Component: NavigationMenu', () => {
  it('should render for authenticated users', () => {
    const mockUserLogin = 'User1';
    const favorites = [
      { ...makeFakeBriefOffer(), isFavorite: true },
      { ...makeFakeBriefOffer(), isFavorite: true },
      { ...makeFakeBriefOffer(), isFavorite: true }
    ];

    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userLogin: mockUserLogin,
        userAvatarUrl: 'https://url-to-image/image.png',
      },
      [NameSpace.ApiCommunication]: {
        favorites: favorites,
      }
    };
    const { withStoreComponent } = withStore(<NavigationMenu />, overrideState);
    render(withStoreComponent, {wrapper: MemoryRouter});

    expect(screen.getByText(mockUserLogin)).toBeInTheDocument();
    expect(screen.getByText(favorites.length)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/)).toBeInTheDocument();
    expect(screen.getByAltText(/User avatar/)).toBeInTheDocument();
  });

  it('should render for unauthenticated users', () => {
    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      }
    };
    const { withStoreComponent } = withStore(<NavigationMenu />, overrideState);
    render(withStoreComponent, {wrapper: MemoryRouter});

    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
  });
});
