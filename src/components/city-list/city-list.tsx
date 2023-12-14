import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {City} from '../../types/city.ts';

interface CityListProps {
    cities: City[];
    selectedCity: City;
    onSelect: (city: City) => void;
}

function CityList({cities, selectedCity, onSelect}: Readonly<CityListProps>) {
  const cityList = cities.map((city) => (
    <li key={city.name} className="locations__item">
      <Link
        className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': city.name === selectedCity.name})}
        to="#"
        onClick={() => onSelect(city)}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  ));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityList}
        </ul>
      </section>
    </div>
  );
}

export default CityList;
