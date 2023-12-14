import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import OfferDetails from '../../../components/offer-details/offer-details.tsx';
import {AuthorizationStatus} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeFullOffer} from '../../utils/mocks.ts';

describe('Component: OfferDetails', () => {
  it('should render offer details correctly for authenticated users', () => {
    const fakeOffer = makeFakeFullOffer();
    fakeOffer.maxAdults = 3;
    const { withStoreComponent } = withStore(
      <OfferDetails
        offer={fakeOffer}
        authorizationStatus={AuthorizationStatus.Auth}
        currentOfferFavorite={false}
      />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`Max ${fakeOffer.maxAdults} adults`)).toBeInTheDocument();
  });

  it('should render offer details correctly for non-authenticated users', () => {
    const fakeOffer = makeFakeFullOffer();
    const { withStoreComponent } = withStore(
      <OfferDetails
        offer={fakeOffer}
        authorizationStatus={AuthorizationStatus.NoAuth}
        currentOfferFavorite={false}
      />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });
});
