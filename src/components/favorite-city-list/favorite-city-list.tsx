import {Link} from 'react-router-dom';
import {AuthorizationStatusType} from '../../const.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import Card from '../card/card.tsx';

interface FavoriteCityListProps {
    cityName: string;
    cityOffers: BriefOffer[];
    authorizationStatus: AuthorizationStatusType;
}

function FavoriteCityList({cityName, cityOffers, authorizationStatus}: Readonly<FavoriteCityListProps>) {
  return (
    <li key={cityName} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="#">
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {cityOffers.map((offer) => (
          <Card
            key={offer.id}
            cardType={'favorite'}
            offer={offer}
            authorizationStatus={authorizationStatus}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoriteCityList;
