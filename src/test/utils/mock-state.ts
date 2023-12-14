import {SortOptionsType} from '../../components/sort-list/sort-offers.ts';
import {AuthorizationStatus, CITY_FOR_EMPTY_LIST, NameSpace} from '../../const.ts';
import {OfferStatus} from '../../types/offer-status.ts';

export const completeInitialState = {
  [NameSpace.UserPreferences]: {
    authorizationStatus: AuthorizationStatus.Unknown,
    isAuthLoading: false,
    isInvalidCredentialsEntered: false,
    userLogin: '',
    userAvatarUrl: '',
  },
  [NameSpace.SessionState]: {
    selectedCity: CITY_FOR_EMPTY_LIST[0],
    isCitySelected: false,
    cities: CITY_FOR_EMPTY_LIST,
    currentSortType: 'POPULAR' as SortOptionsType,
  },
  [NameSpace.ApiCommunication]: {
    offers: [],
    currentOffer: null,
    currentNearbyOffers: null,
    currentReviews: null,
    favorites: [],
    isLoading: false,
    isReviewSubmitted: false,
    currentOfferStatus: OfferStatus.LOADING,
  },
};
