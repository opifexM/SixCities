import {render, screen} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';
import MainPage from '../../../pages/main-page/main-page.tsx';
import {withStore} from '../../utils/mock-component';

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => children,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Page: MainPage', () => {
  it('should render main page with header and offer list container', () => {
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
    const { withStoreComponent } = withStore(<MainPage />, overrideState);
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText('6 Sites - Main')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('offer-list-container')).toBeInTheDocument();
  });
});
