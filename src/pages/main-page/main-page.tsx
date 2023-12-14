import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header.tsx';
import OfferListContainer from '../../components/offer-list-container/offer-list-container.tsx';

function MainPage() {
  return (
    <div className="page page--gray page--main" data-testid="main-page">
      <Helmet>
        <title>6 Sites - Main</title>
      </Helmet>
      <Header/>
      <OfferListContainer/>
    </div>
  );
}

export default MainPage;
