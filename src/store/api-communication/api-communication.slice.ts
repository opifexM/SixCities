import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {FullOffer} from '../../types/full-offer.ts';
import {OfferStatus, OfferStatusType} from '../../types/offer-status.ts';
import {Review} from '../../types/review.ts';
import {
  fetchCurrentNearbyOffersAction,
  fetchCurrentOfferAction,
  fetchCurrentReviewsAction,
  fetchFavoritesAction,
  fetchOffersAction,
  postReviewAction,
  updateFavoriteAction
} from '../api-actions/data-api-actions.ts';

interface ApiCommunicationState {
    offers: BriefOffer[];
    currentOffer: FullOffer | null;
    currentNearbyOffers: BriefOffer[] | null;
    currentReviews: Review[] | null;
    favorites: BriefOffer[];
    isLoading: boolean;
    isReviewSubmitted: boolean;
    currentOfferStatus: OfferStatusType;
}

const initialState: ApiCommunicationState = {
  offers: [],
  currentOffer: null,
  currentNearbyOffers: null,
  currentReviews: null,
  favorites: [],
  isLoading: false,
  isReviewSubmitted: false,
  currentOfferStatus: OfferStatus.LOADING,
};

export const apiCommunicationSlice = createSlice({
  name: NameSpace.ApiCommunication,
  initialState,
  reducers: {
    clearCurrentOffer: (state) => {
      state.currentOffer = null;
    },
    clearCurrentNearbyOffers: (state) => {
      state.currentNearbyOffers = null;
    },
    clearCurrentReviews: (state) => {
      state.currentReviews = null;
    },
    setReviewSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isReviewSubmitted = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isLoading = true;
        state.currentOfferStatus = OfferStatus.LOADING;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isLoading = false;
        state.currentOfferStatus = OfferStatus.NOT_EXISTS;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
        state.currentOfferStatus = OfferStatus.EXISTS;
      })

      .addCase(fetchCurrentNearbyOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentNearbyOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCurrentNearbyOffersAction.fulfilled, (state, action) => {
        state.currentNearbyOffers = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchCurrentReviewsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentReviewsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCurrentReviewsAction.fulfilled, (state, action) => {
        state.currentReviews = action.payload;
        state.isLoading = false;
      })

      .addCase(postReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewSubmitted = false;
        state.isLoading = false;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewSubmitted = true;
        state.isLoading = false;
      })

      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })

      .addCase(updateFavoriteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavoriteAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFavoriteAction.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  clearCurrentOffer,
  clearCurrentReviews,
  clearCurrentNearbyOffers,
  setReviewSubmitted
} = apiCommunicationSlice.actions;
