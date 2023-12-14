import {render, screen} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../../const';
import NotFoundPage from '../../../pages/not-found-page/not-found-page.tsx';
import {withStore} from '../../utils/mock-component';

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => children,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Page: NotFoundPage', () => {
  it('should render NotFoundPage with header, error text, and return home link', () => {
    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    };
    const { withStoreComponent } = withStore(<NotFoundPage />, overrideState);
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByText('6 Sites - 404')).toBeInTheDocument(); // Проверяем title из Helmet
    expect(screen.getByText('Oops! - 404')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return Home/i })).toBeInTheDocument();
  });
});
