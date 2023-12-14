import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import useUserData from '../../hooks/use-user-data.ts';

import {logoutAction} from '../../store/api-actions/user-api-actions.ts';
import {getFavorites} from '../../store/api-communication/api-communication.selectors.ts';

function NavigationMenu() {
  const dispatch = useAppDispatch();
  const {authorizationStatus, userAvatarUrl, userLogin} = useUserData();
  const navigate = useNavigate();
  const favorites = useAppSelector(getFavorites);


  const logout = async () => {
    await dispatch(logoutAction());
    navigate(AppRoute.Login);
  };

  const handleSignOutClick = () => {
    logout();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      logout();
    }
  };

  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to="/favorites">
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar"
                  src={userAvatarUrl}
                  width="54"
                  height="54"
                  alt="User avatar"
                >
                </img>
              </div>
              <span className="header__user-name user__name">{userLogin}</span>
              <span className="header__favorite-count">{favorites.length}</span>
            </Link>
          </li>
          <li
            className="header__nav-item"
            onClick={handleSignOutClick}
            onKeyDown={handleKeyDown}
          >
            <Link className="header__nav-link header__nav-link--profile" to='#'>
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavigationMenu;
