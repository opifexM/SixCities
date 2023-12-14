import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import Card from '../../../components/card/card.tsx';
import {AuthorizationStatus} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeBriefOffer} from '../../utils/mocks.ts';

describe('Component: Card', () => {
  it('should render card details correctly', () => {
    const fakeOffer = makeFakeBriefOffer();
    const { withStoreComponent } = withStore(
      <Card
        cardType="cities"
        offer={fakeOffer}
        authorizationStatus={AuthorizationStatus.Auth}
      />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();

    const image = screen.getByAltText(fakeOffer.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', fakeOffer.previewImage);

    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
  });
});
