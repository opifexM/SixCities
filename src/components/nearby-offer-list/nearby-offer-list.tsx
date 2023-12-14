import {AuthorizationStatusType} from '../../const.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import Card from '../card/card.tsx';

interface NearbyOfferListProps {
  offers: BriefOffer[];
  selectedOffer: BriefOffer;
  onCardInteraction?: (cardId: BriefOffer['id']) => void;
  authorizationStatus: AuthorizationStatusType;
  currentOfferId?: BriefOffer['id'];
}

function NearbyOfferList({offers, selectedOffer, onCardInteraction, currentOfferId, authorizationStatus}: Readonly<NearbyOfferListProps>) {
  const offerCards = offers
    .slice(0, 3)
    .map((offer) => (
      <Card
        authorizationStatus={authorizationStatus}
        key={offer.id}
        cardType={'cities'}
        offer={offer}
        onCardInteraction={onCardInteraction}
        currentOfferId={currentOfferId}
      />
    ));
  const handleCardInteraction = onCardInteraction ? () => onCardInteraction(selectedOffer.id) : undefined;

  return (
    <div className="container" data-testid="nearby-offer-list">
      <section
        className="near-places places"
        onMouseLeave={handleCardInteraction}
      >
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offerCards}
        </div>
      </section>
    </div>
  );
}

export default NearbyOfferList;
