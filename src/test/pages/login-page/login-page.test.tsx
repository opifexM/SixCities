import {render, screen} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../../const';
import LoginPage from '../../../pages/login-page/login-page.tsx';
import {withStore} from '../../utils/mock-component';

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => children,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Page: LoginPage', () => {
  it('should render login page correctly', () => {
    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    };
    const { withStoreComponent } = withStore(<LoginPage />, overrideState);
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });
});
