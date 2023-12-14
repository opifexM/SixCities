import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import Header from '../../../components/header/header.tsx';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';
import {withStore} from '../../utils/mock-component';

describe('Component: Header', () => {
  it('should render the Logo and NavigationMenu components', () => {
    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    };

    const { withStoreComponent } = withStore(<Header />, overrideState);
    render(withStoreComponent, {wrapper: MemoryRouter});

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/)).toBeInTheDocument(); // Example element in NavigationMenu
  });
});
