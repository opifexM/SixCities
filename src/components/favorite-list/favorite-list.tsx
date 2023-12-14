import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-preferences/user-preferences.selectors.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import FavoriteCityList from '../favorite-city-list/favorite-city-list.tsx';

interface FavoriteListProps {
  offers: BriefOffer[];
}

function FavoriteList({offers}: Readonly<FavoriteListProps>) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const cityOffersMap = offers
    .filter((offer) => offer.isFavorite)
    .reduce<Record<string, BriefOffer[]>>((acc, offer) => {
      acc[offer.city.name] = [...(acc[offer.city.name] ?? []), offer];
      return acc;
    }, {});

  const favoriteList = Object.entries(cityOffersMap).map(([cityName, cityOffers]) => (
    <FavoriteCityList
      key={cityName}
      cityName={cityName}
      cityOffers={cityOffers}
      authorizationStatus={authorizationStatus}
    />
  ));

  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {favoriteList}
        </ul>
      </section>
    </div>
  );
}

export default FavoriteList;
