import {FormEvent, useEffect, useRef, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import {AppRoute} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions/user-api-actions.ts';
import {getOffers} from '../../store/api-communication/api-communication.selectors.ts';
import {getCities} from '../../store/ui-settings/ui-settings.selectors.ts';
import {selectCity} from '../../store/ui-settings/ui-settings.slice.ts';
import {getIsInvalidCredentialsEntered} from '../../store/user-preferences/user-preferences.selectors.ts';
import {setInvalidCredentialsEntered} from '../../store/user-preferences/user-preferences.slice.ts';
import {City} from '../../types/city.ts';

function LoginPage() {
  const [defaultCity, setDefaultCity] = useState<City>();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const isInvalidCredentialsEntered = useAppSelector(getIsInvalidCredentialsEntered);
  const cities = useAppSelector(getCities);
  const offers = useAppSelector(getOffers);

  useEffect(() => {
    if (isInvalidCredentialsEntered) {
      if (loginRef.current && passwordRef.current) {
        loginRef.current.value = '';
        passwordRef.current.value = '';
      }
      dispatch(setInvalidCredentialsEntered(false));
    }
  }, [dispatch, isInvalidCredentialsEntered]);

  useEffect(() => {
    if (offers.length > 0 && !defaultCity) {
      setDefaultCity(cities[Math.floor(Math.random() * cities.length)]);
    }
  }, [offers.length, cities, defaultCity]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (loginRef.current && passwordRef.current) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  function handlerDefaultCityNameClick() {
    if (defaultCity) {
      dispatch(selectCity(defaultCity));
    }
  }

  const sectionRandomCity = defaultCity ? (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          onClick={handlerDefaultCityNameClick}
          className="locations__item-link"
          to={AppRoute.Main}
        >
          <span>{defaultCity.name}</span>
        </Link>
      </div>
    </section>
  ) : null;

  return (
    <div className="page page--gray page--login" data-testid="login-page">
      <Helmet>
        <title>6 Sites - Login</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form"
              action=""
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input"
                  ref={loginRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                >
                </input>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input"
                  ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                >
                </input>
              </div>
              <button className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          {sectionRandomCity}
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
