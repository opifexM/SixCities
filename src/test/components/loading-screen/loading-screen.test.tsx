import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import LoadingScreen from '../../../components/loading-screen/loading-screen.tsx';
import {NameSpace} from '../../../const.ts';
import {withStore} from '../../utils/mock-component';

describe('Component: LoadingScreen', () => {
  it('should render loading screen when application is loading', () => {
    const overrideState = {
      [NameSpace.ApiCommunication]: { isLoading: true },
      [NameSpace.UserPreferences]: { isAuthLoading: false }
    };
    const { withStoreComponent } = withStore(<LoadingScreen />, overrideState);
    render(withStoreComponent);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should render loading screen when authentication is loading', () => {
    const overrideState = {
      [NameSpace.ApiCommunication]: { isLoading: false },
      [NameSpace.UserPreferences]: { isAuthLoading: true }
    };
    const { withStoreComponent } = withStore(<LoadingScreen />, overrideState);
    render(withStoreComponent);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should not render loading screen when nothing is loading', () => {
    const overrideState = {
      [NameSpace.ApiCommunication]: { isLoading: false },
      [NameSpace.UserPreferences]: { isAuthLoading: false }
    };
    const { withStoreComponent } = withStore(<LoadingScreen />, overrideState);
    render(withStoreComponent);
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });
});
