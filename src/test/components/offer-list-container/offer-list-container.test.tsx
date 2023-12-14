import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import OfferListContainer from '../../../components/offer-list-container/offer-list-container.tsx';
import {SortOptionsType} from '../../../components/sort-list/sort-offers.ts';
import {NameSpace} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeBriefOffer, makeFakeCity} from '../../utils/mocks.ts';

describe('Component: OfferListContainer', () => {
  it('should render correct number of offers when they are available', () => {
    const selectedCity = makeFakeCity();
    const fakeOffers = Array.from({ length: 6 }, () => makeFakeBriefOffer());
    fakeOffers.forEach((offer) => {
      offer.city = selectedCity;
    });
    const overrideState = {
      [NameSpace.SessionState]: {
        selectedCity: selectedCity,
        cities: [selectedCity],
        currentSortType: 'POPULAR' as SortOptionsType,
      },
      [NameSpace.ApiCommunication]: {
        offers: fakeOffers,
      },
    };
    const { withStoreComponent } = withStore(<OfferListContainer />, overrideState);
    render(withStoreComponent, { wrapper: MemoryRouter });

    const offerCards = screen.getAllByText(/€/);
    expect(offerCards).toHaveLength(fakeOffers.length);
  });

  it('should display no offers message when offers are not available', () => {
    const selectedCity = makeFakeCity();
    const overrideState = {
      [NameSpace.SessionState]: {
        selectedCity: selectedCity,
        cities: [selectedCity],
      },
      [NameSpace.ApiCommunication]: {
        offers: [],
      },
    };
    const { withStoreComponent } = withStore(<OfferListContainer />, overrideState);
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByText(/No places to stay available/)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment/)).toBeInTheDocument();
  });
});


