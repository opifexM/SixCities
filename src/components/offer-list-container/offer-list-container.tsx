import {MAX_RENT_OFFERS} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getOffers} from '../../store/api-communication/api-communication.selectors.ts';
import {getCities, getSelectedCity} from '../../store/ui-settings/ui-settings.selectors.ts';
import {selectCity} from '../../store/ui-settings/ui-settings.slice.ts';
import CityList from '../city-list/city-list.tsx';
import OfferList from '../offer-list/offer-list.tsx';

function OfferListContainer() {
  const offers = useAppSelector(getOffers);
  const selectedCity = useAppSelector(getSelectedCity);
  const cities = useAppSelector(getCities);
  const dispatch = useAppDispatch();
  const isOffersEmpty = offers.length === 0;

  return (
    isOffersEmpty ? (
      <main className="page__main page__main--index page__main--index-empty" data-testid="offer-list-container">
        <h1 className="visually-hidden">Cities</h1>
        <CityList
          cities={cities}
          selectedCity={selectedCity}
          onSelect={(city) => dispatch(selectCity(city))}
        />
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment
                in {selectedCity.name}
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    ) : (
      <main className="page__main page__main--index" data-testid="offer-list-container">
        <h1 className="visually-hidden">Cities</h1>
        <CityList
          cities={cities}
          selectedCity={selectedCity}
          onSelect={(city) => dispatch(selectCity(city))}
        />
        <OfferList
          offers={offers}
          selectedCity={selectedCity}
          maxOfferLimit={MAX_RENT_OFFERS}
        />
      </main>
    )
  );
}

export default OfferListContainer;
