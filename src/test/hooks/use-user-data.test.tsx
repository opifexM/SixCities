import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import useUserData from '../../hooks/use-user-data.ts';
import {withStore} from '../utils/mock-component.tsx';

function TestComponent() {
  const { authorizationStatus, userLogin, userAvatarUrl } = useUserData();
  return (
    <div>
      <span data-testid="auth-status">{authorizationStatus}</span>
      <span data-testid="user-login">{userLogin}</span>
      <span data-testid="user-avatar">{userAvatarUrl}</span>
    </div>
  );
}

describe('Hook: useUserData', () => {
  it('should return user data correctly', () => {
    const mockUserLogin = 'User1';
    const mockUserAvatarUrl = 'https://url-to-image/image.png';

    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userLogin: mockUserLogin,
        userAvatarUrl: mockUserAvatarUrl,
      }
    };
    const { withStoreComponent } = withStore(<TestComponent />, overrideState);
    render(withStoreComponent, {wrapper: MemoryRouter});

    expect(screen.getByTestId('auth-status').textContent).toBe(AuthorizationStatus.Auth);
    expect(screen.getByTestId('user-login').textContent).toBe(mockUserLogin);
    expect(screen.getByTestId('user-avatar').textContent).toBe(mockUserAvatarUrl);
  });
});
