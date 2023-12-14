import {ComponentType, useEffect} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, BrowserRouterProps, MemoryRouterProps, Route, Routes} from 'react-router-dom';
import LoadingText from './components/loading-text/loading-text.tsx';
import PrivateRoute from './components/private-route/private-route.tsx';
import {AppRoute, AuthorizationStatus, CITY_BY_DEFAULT} from './const.ts';
import {useAppDispatch, useAppSelector} from './hooks';
import FavoritePage from './pages/favorite-page/favorite-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import MainPage from './pages/main-page/main-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';
import OfferPage from './pages/offer-page/offer-page.tsx';
import {fetchFavoritesAction, fetchOffersAction} from './store/api-actions/data-api-actions.ts';
import {checkAuthAction} from './store/api-actions/user-api-actions.ts';
import {getOffers} from './store/api-communication/api-communication.selectors.ts';
import {getIsCitySelected} from './store/ui-settings/ui-settings.selectors.ts';
import {selectCity, setCities} from './store/ui-settings/ui-settings.slice.ts';
import {getAuthorizationStatus} from './store/user-preferences/user-preferences.selectors.ts';
import {City} from './types/city.ts';

type CustomRouterProps = BrowserRouterProps | MemoryRouterProps;

interface AppProps {
  RouterComponent?: ComponentType<CustomRouterProps>;
  routerProps?: CustomRouterProps;
}

function App({ RouterComponent = BrowserRouter, routerProps = {} }: Readonly<AppProps>) {
  const offers = useAppSelector(getOffers);
  const isCitySelected = useAppSelector(getIsCitySelected);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, authorizationStatus]);

  useEffect(() => {
    if (offers.length > 0 && !isCitySelected) {
      const cities = offers.reduce((unique, offer) => {
        if (!unique.some((city) => city.name === offer.city.name)) {
          unique.push(offer.city);
        }
        return unique;
      }, [] as City[]);
      dispatch(setCities(cities));

      const cityByDefault = offers
        .find((offer) => offer.city.name.toLowerCase() === CITY_BY_DEFAULT.toLowerCase())?.city ?? offers[0].city;
      dispatch(selectCity(cityByDefault));
    }
  }, [dispatch, offers, isCitySelected]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingText/>;
  }

  return (
    <HelmetProvider>
      <RouterComponent {...routerProps}>
        <Routes>
          <Route path={AppRoute.Main}
            element={
              <MainPage/>
            }
          />
          <Route path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
                requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
                declinedElement={AppRoute.Main}
              >
                <LoginPage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
                requiredAuthorizationStatus={AuthorizationStatus.Auth}
                declinedElement={AppRoute.Login}
              >
                <FavoritePage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.OfferId}
            element={
              <OfferPage/>
            }
          />
          <Route path="*"
            element={
              <NotFoundPage/>
            }
          />
        </Routes>
      </RouterComponent>
    </HelmetProvider>
  );
}

export default App;
