import classNames from 'classnames';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router-dom';
import FavoriteList from '../../components/favorite-list/favorite-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {getFavorites} from '../../store/api-communication/api-communication.selectors.ts';
import {getAuthorizationStatus} from '../../store/user-preferences/user-preferences.selectors.ts';

function FavoritePage() {
  const favorites = useAppSelector(getFavorites);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
  }, [authorizationStatus, navigate]);

  const isFavoritesEmpty = favorites.length === 0;

  const favoriteList = isFavoritesEmpty ? (
    <div className="page__favorites-container container">
      <section className="favorites favorites--empty">
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
        </div>
      </section>
    </div>
  ) : (
    <FavoriteList offers={favorites}/>
  );

  return (
    <div className={classNames('page', {'page--favorites-empty': isFavoritesEmpty})} data-testid="favorite-page">
      <Helmet>
        <title>6 Sites - Favorite</title>
      </Helmet>
      <Header />
      <main className={classNames('page__main', 'page__main--favorites', {'page__main--favorites-empty': isFavoritesEmpty})}>
        {favoriteList}
      </main>
      <Footer />
    </div>
  );
}

export default FavoritePage;
