import {beforeEach, describe, expect, it} from 'vitest';
import {
  fetchCurrentNearbyOffersAction,
  fetchCurrentOfferAction,
  fetchCurrentReviewsAction,
  fetchFavoritesAction,
  fetchOffersAction,
  postReviewAction,
  updateFavoriteAction
} from '../../../store/api-actions/data-api-actions.ts';
import {
  apiCommunicationSlice,
  clearCurrentNearbyOffers,
  clearCurrentOffer,
  clearCurrentReviews,
  setReviewSubmitted
} from '../../../store/api-communication/api-communication.slice.ts';
import {OfferStatus} from '../../../types/offer-status.ts';
import {makeFakeBriefOffer, makeFakeFullOffer, makeFakeReview} from '../../utils/mocks.ts';

describe('UserPreferences Slice', () => {
  let initialState: ReturnType<typeof apiCommunicationSlice.reducer>;
  beforeEach(() => {
    initialState = apiCommunicationSlice.reducer(undefined, { type: '' });
  });

  it('should not change state for unknown action type', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const stateAfterUnknownAction = apiCommunicationSlice.reducer(initialState, unknownAction);
    expect(stateAfterUnknownAction).toEqual(initialState);
  });

  it('should handle clearCurrentOffer', () => {
    const action = clearCurrentOffer();
    const state = apiCommunicationSlice.reducer(initialState, action);
    expect(state.currentOffer).toBeNull();
  });

  it('should handle clearCurrentNearbyOffers', () => {
    const action = clearCurrentNearbyOffers();
    const state = apiCommunicationSlice.reducer(initialState, action);
    expect(state.currentNearbyOffers).toBeNull();
  });

  it('should handle clearCurrentReviews', () => {
    const action = clearCurrentReviews();
    const state = apiCommunicationSlice.reducer(initialState, action);
    expect(state.currentReviews).toBeNull();
  });

  it('should handle setReviewSubmitted', () => {
    const action = setReviewSubmitted(true);
    const state = apiCommunicationSlice.reducer(initialState, action);
    expect(state.isReviewSubmitted).toEqual(true);
  });

  it('should handle fetchOffersAction.pending', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchOffersAction.pending);
    expect(state.isLoading).toEqual(true);
  });

  it('should handle fetchOffersAction.rejected', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchOffersAction.rejected);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle fetchOffersAction.fulfilled', () => {
    const offers = [makeFakeBriefOffer(), makeFakeBriefOffer()];
    const state = apiCommunicationSlice.reducer(
      initialState,
      fetchOffersAction.fulfilled(offers, '', undefined)
    );
    expect(state.offers).toEqual(offers);
    expect(state.isLoading).toEqual(false);
  });


  it('should handle fetchCurrentOfferAction.pending', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchCurrentOfferAction.pending);
    expect(state.isLoading).toEqual(true);
    expect(state.currentOfferStatus).toEqual(OfferStatus.LOADING);
  });

  it('should handle fetchCurrentOfferAction.rejected', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchCurrentOfferAction.rejected);
    expect(state.isLoading).toEqual(false);
    expect(state.currentOfferStatus).toEqual(OfferStatus.NOT_EXISTS);
  });

  it('should handle fetchCurrentOfferAction.fulfilled', () => {
    const currentOffer = makeFakeFullOffer();
    const state = apiCommunicationSlice.reducer(
      initialState,
      fetchCurrentOfferAction.fulfilled(currentOffer, '', '')
    );
    expect(state.currentOffer).toEqual(currentOffer);
    expect(state.isLoading).toEqual(false);
    expect(state.currentOfferStatus).toEqual(OfferStatus.EXISTS);
  });


  it('should handle fetchCurrentNearbyOffersAction.pending', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchCurrentNearbyOffersAction.pending);
    expect(state.isLoading).toEqual(true);
  });

  it('should handle fetchCurrentNearbyOffersAction.rejected', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchCurrentNearbyOffersAction.rejected);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle fetchCurrentNearbyOffersAction.fulfilled', () => {
    const nearbyOffers = [makeFakeBriefOffer(), makeFakeBriefOffer()];
    const state = apiCommunicationSlice.reducer(
      initialState,
      fetchCurrentNearbyOffersAction.fulfilled(nearbyOffers, '', '')
    );
    expect(state.currentNearbyOffers).toEqual(nearbyOffers);
    expect(state.isLoading).toEqual(false);
  });


  it('should handle fetchCurrentReviewsAction.pending', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchCurrentReviewsAction.pending);
    expect(state.isLoading).toEqual(true);
  });

  it('should handle fetchCurrentReviewsAction.rejected', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchCurrentReviewsAction.rejected);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle fetchCurrentReviewsAction.fulfilled', () => {
    const reviews = [makeFakeReview(), makeFakeReview()];
    const state = apiCommunicationSlice.reducer(
      initialState,
      fetchCurrentReviewsAction.fulfilled(reviews, '', '')
    );
    expect(state.currentReviews).toEqual(reviews);
    expect(state.isLoading).toEqual(false);
  });


  it('should handle postReviewAction.pending', () => {
    const state = apiCommunicationSlice.reducer(initialState, postReviewAction.pending);
    expect(state.isLoading).toEqual(true);
  });

  it('should handle postReviewAction.rejected', () => {
    const state = apiCommunicationSlice.reducer(initialState, postReviewAction.rejected);
    expect(state.isReviewSubmitted).toEqual(false);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle postReviewAction.fulfilled', () => {
    const state = apiCommunicationSlice.reducer(initialState, postReviewAction.fulfilled);
    expect(state.isReviewSubmitted).toEqual(true);
    expect(state.isLoading).toEqual(false);
  });


  it('should handle fetchFavoritesAction.pending', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchFavoritesAction.pending);
    expect(state.isLoading).toEqual(true);
  });

  it('should handle fetchFavoritesAction.rejected', () => {
    const state = apiCommunicationSlice.reducer(initialState, fetchFavoritesAction.rejected);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle fetchFavoritesAction.fulfilled', () => {
    const favorites = [makeFakeBriefOffer(), makeFakeBriefOffer()];
    const state = apiCommunicationSlice.reducer(
      initialState,
      fetchFavoritesAction.fulfilled(favorites, '', undefined)
    );
    expect(state.favorites).toEqual(favorites);
    expect(state.isLoading).toEqual(false);
  });


  it('should handle updateFavoriteAction.pending', () => {
    const state = apiCommunicationSlice.reducer(initialState, updateFavoriteAction.pending);
    expect(state.isLoading).toEqual(true);
  });

  it('should handle updateFavoriteAction.rejected', () => {
    const state = apiCommunicationSlice.reducer(initialState, updateFavoriteAction.rejected);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle updateFavoriteAction.fulfilled', () => {
    const state = apiCommunicationSlice.reducer(initialState, updateFavoriteAction.fulfilled);
    expect(state.isLoading).toEqual(false);
  });
});
