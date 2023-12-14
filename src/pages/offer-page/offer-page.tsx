import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import LoadingText from '../../components/loading-text/loading-text.tsx';
import NearbyOfferList from '../../components/nearby-offer-list/nearby-offer-list.tsx';
import OfferBlock from '../../components/offer-block/offer-block.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOfferDetails} from '../../store/api-actions/data-api-actions.ts';
import {
  getCurrentNearbyOffers,
  getCurrentOffer,
  getCurrentOfferStatus
} from '../../store/api-communication/api-communication.selectors.ts';
import {getAuthorizationStatus} from '../../store/user-preferences/user-preferences.selectors.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {OfferStatus} from '../../types/offer-status.ts';
import NotFoundPage from '../not-found-page/not-found-page.tsx';

function OfferPage() {
  const [selectedOfferId, setSelectedOfferId] = useState<BriefOffer['id']>('');
  const {id: urlId} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const currentOfferStatus = useAppSelector(getCurrentOfferStatus);
  const currentOffer = useAppSelector(getCurrentOffer);
  const currentNearbyOffers = useAppSelector(getCurrentNearbyOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (urlId) {
      dispatch(fetchOfferDetails(urlId));
    }
  }, [dispatch, urlId]);

  if (currentOfferStatus === OfferStatus.NOT_EXISTS || !urlId) {
    return <NotFoundPage text={`Offer with id '${urlId}' not found.`}/>;
  }

  if (currentOfferStatus === OfferStatus.LOADING) {
    return null;
  }

  const nearbyOfferBlock = (currentOffer && currentNearbyOffers) ? (
    <NearbyOfferList
      offers={currentNearbyOffers}
      selectedOffer={currentOffer}
      onCardInteraction={setSelectedOfferId}
      authorizationStatus={authorizationStatus}
      currentOfferId={currentOffer.id}
    />
  ) : <LoadingText/>;

  return (
    <div className="page" data-testid="offer-page">
      <Helmet>
        <title>6 Sites - Offers</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--offer">
        <OfferBlock
          urlId={urlId}
          selectedOfferId={selectedOfferId}
        />
        {nearbyOfferBlock}
      </main>
    </div>
  );
}

export default OfferPage;
