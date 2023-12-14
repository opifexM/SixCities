import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import NearbyOfferList from '../../../components/nearby-offer-list/nearby-offer-list.tsx';
import {AuthorizationStatus, MAX_NEAR_OFFERS} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeBriefOffer} from '../../utils/mocks.ts';

describe('Component: NearbyOfferList', () => {
  it('should render only first MAX_NEAR_OFFERS nearby offers', () => {
    const fakeOffers = [
      makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer()
    ];
    const selectedOffer = makeFakeBriefOffer();
    const handleCardInteractionMock = vi.fn();
    const { withStoreComponent } = withStore(
      <NearbyOfferList
        offers={fakeOffers}
        selectedOffer={selectedOffer}
        onCardInteraction={handleCardInteractionMock}
        authorizationStatus={AuthorizationStatus.Auth}
      />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    const offerElements = screen.getAllByText(/€/);
    expect(offerElements).toHaveLength(MAX_NEAR_OFFERS);
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should call onCardInteraction when mouse leaves the section', () => {
    const fakeOffers = [
      makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer(), makeFakeBriefOffer()
    ];
    const selectedOffer = makeFakeBriefOffer();
    const handleCardInteractionMock = vi.fn();
    const { withStoreComponent } = withStore(
      <NearbyOfferList
        offers={fakeOffers}
        selectedOffer={selectedOffer}
        onCardInteraction={handleCardInteractionMock}
        authorizationStatus={AuthorizationStatus.Auth}
      />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    fireEvent.mouseLeave(screen.getByText('Other places in the neighbourhood'));
    expect(handleCardInteractionMock).toHaveBeenCalledWith(selectedOffer.id);
  });
});

