import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import FavoriteCityList from '../../../components/favorite-city-list/favorite-city-list.tsx';
import {AppRoute, AuthorizationStatus} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeBriefOffer} from '../../utils/mocks.ts';

describe('Component: FavoriteCityList', () => {
  it('should render favorite city list correctly', () => {
    const fakeOffers = [makeFakeBriefOffer(), makeFakeBriefOffer()];
    const cityName = 'Paris';
    const { withStoreComponent } = withStore(
      <FavoriteCityList
        cityName={cityName}
        cityOffers={fakeOffers}
        authorizationStatus={AuthorizationStatus.Auth}
      />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByText(cityName)).toBeInTheDocument();

    fakeOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();

      const offerLink = `${AppRoute.Offer}/${offer.id}`;
      const linkElements = screen.getAllByRole('link', { name: offer.title });
      const linkWithCorrectHref = linkElements.some((link) => link.getAttribute('href') === offerLink);
      expect(linkWithCorrectHref).toBeTruthy();
    });
  });
});
