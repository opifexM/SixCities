import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import FavoriteList from '../../../components/favorite-list/favorite-list.tsx';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeBriefOffer} from '../../utils/mocks.ts';

describe('Component: FavoriteList', () => {
  it('should render favorite list with grouped offers by city', () => {
    const fakeOffers = [
      { ...makeFakeBriefOffer(), isFavorite: true },
      { ...makeFakeBriefOffer(), isFavorite: true },
      { ...makeFakeBriefOffer(), isFavorite: true }
    ];
    fakeOffers[0].city.name = 'Paris';
    fakeOffers[1].city.name = 'Paris';
    fakeOffers[2].city.name = 'Berlin';
    const { withStoreComponent } = withStore(
      <FavoriteList offers={fakeOffers} />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByText('Saved listing')).toBeInTheDocument();

    const parisOffers = fakeOffers.filter((offer) => offer.city.name === 'Paris');
    const berlinOffers = fakeOffers.filter((offer) => offer.city.name === 'Berlin');

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getAllByText(parisOffers[0].title).length).toBeGreaterThan(0);
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getAllByText(berlinOffers[0].title).length).toBeGreaterThan(0);
  });
});
