import {render, screen} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import App from '../../../app.tsx';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../../const';
import {OfferStatus} from '../../../types/offer-status.ts';
import {withStore} from '../../utils/mock-component';
import {makeFakeBriefOffer, makeFakeFullOffer, makeFakeReview} from '../../utils/mocks.ts';

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => children,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Page: OfferPage', () => {
  it('should display offer details when offer is loaded', () => {
    const fakeOffer = makeFakeFullOffer();
    const fakeNearbyOffers = [makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer()];
    const fakeReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
    const fakeOfferId = fakeOffer.id;

    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.ApiCommunication]: {
        offers: fakeNearbyOffers,
        currentOffer: fakeOffer,
        currentNearbyOffers: fakeNearbyOffers,
        currentReviews: fakeReviews,
        isLoading: false,
        currentOfferStatus: OfferStatus.EXISTS,
        favorites: [makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer()],
      },
    };

    const { withStoreComponent } = withStore(
      <App RouterComponent={MemoryRouter} routerProps={{ initialEntries: [`${AppRoute.Offer}/${fakeOfferId}`] }} />,
      overrideState
    );
    render(withStoreComponent);

    expect(screen.getByTestId('nearby-offer-list')).toBeInTheDocument();
  });

  it('should display NotFoundPage when offer does not exist', () => {
    const fakeOffer = makeFakeFullOffer();
    const fakeNearbyOffers = [makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer()];
    const fakeReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
    const fakeOfferId = 'non-existent-id';
    const overrideState = {
      [NameSpace.UserPreferences]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.ApiCommunication]: {
        offers: fakeNearbyOffers,
        currentOffer: fakeOffer,
        currentNearbyOffers: fakeNearbyOffers,
        currentReviews: fakeReviews,
        isLoading: false,
        currentOfferStatus: OfferStatus.NOT_EXISTS,
        favorites: [makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer()],
      },
    };

    const { withStoreComponent } = withStore(
      <App RouterComponent={MemoryRouter} routerProps={{ initialEntries: [`${AppRoute.Offer}/${fakeOfferId}`] }} />,
      overrideState
    );
    render(withStoreComponent);

    expect(screen.getByText(`Offer with id '${fakeOfferId}' not found.`)).toBeInTheDocument();
  });
});
