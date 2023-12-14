import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import OfferDetails from '../../../components/offer-details/offer-details.tsx';
import {AuthorizationStatus} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeFullOffer} from '../../utils/mocks.ts';

describe('Component: OfferDetails', () => {
  it('should render offer details correctly', () => {
    const fakeOffer = makeFakeFullOffer();
    fakeOffer.maxAdults = 3;
    fakeOffer.bedrooms = 3;

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
    expect(screen.getByText(`${fakeOffer.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.host.name)).toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });
});
