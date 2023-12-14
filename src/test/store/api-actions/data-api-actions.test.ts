import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {describe, expect, it, beforeEach} from 'vitest';
import {APIRoute, NameSpace} from '../../../const.ts';
import {createAPI} from '../../../services/api.ts';
import {
  fetchCurrentNearbyOffersAction,
  fetchCurrentOfferAction,
  fetchCurrentReviewsAction,
  fetchFavoritesAction,
  fetchOfferDetails,
  fetchOffersAction,
  postReviewAction,
  submitReviewAndUpdate,
  updateFavoriteAction,
  updateFavoriteCurrentNearbyOfferAction,
  updateFavoriteCurrentOfferAction
} from '../../../store/api-actions/data-api-actions.ts';
import {
  clearCurrentNearbyOffers,
  clearCurrentOffer,
  clearCurrentReviews
} from '../../../store/api-communication/api-communication.slice.ts';
import {State} from '../../../store/state.ts';
import {OfferStatus} from '../../../types/offer-status.ts';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeBriefOffer,
  makeFakeFullOffer,
  makeFakeReview
} from '../../utils/mocks.ts';

describe('User API Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.ApiCommunication]: {
        offers: Array.from({ length: 30 }, () => makeFakeBriefOffer()),
        currentOffer: makeFakeFullOffer(),
        currentNearbyOffers: Array.from({ length: 6 }, () => makeFakeBriefOffer()),
        currentReviews: Array.from({ length: 15 }, () => makeFakeReview()),
        favorites: Array.from({ length: 5 }, () => makeFakeBriefOffer()),
        isLoading: false,
        isReviewSubmitted: false,
        currentOfferStatus: OfferStatus.LOADING,
      }
    });
  });


  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" with successful API call', async () => {
      const fakeOffers = Array.from({ length: 10 }, () => makeFakeBriefOffer());
      mockAxiosAdapter.onGet(APIRoute.GetOffers).reply(200, fakeOffers);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({type: fetchOffersAction.fulfilled.type, payload: fakeOffers}),
        ])
      );
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" if API call fails', async () => {
      mockAxiosAdapter.onGet(APIRoute.GetOffers).reply(500);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });


  describe('fetchCurrentOfferAction', () => {
    it('should dispatch "fetchCurrentOfferAction.pending" and "fetchCurrentOfferAction.fulfilled" with successful API call', async () => {
      const fakeOfferId = '123';
      const fakeOffer = makeFakeFullOffer();
      mockAxiosAdapter.onGet(APIRoute.GetOffer.replace(':offerId', fakeOfferId)).reply(200, fakeOffer);

      await store.dispatch(fetchCurrentOfferAction(fakeOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentOfferAction.pending.type,
        fetchCurrentOfferAction.fulfilled.type,
      ]);

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({type: fetchCurrentOfferAction.fulfilled.type, payload: fakeOffer}),
        ])
      );
    });

    it('should dispatch "fetchCurrentOfferAction.pending" and "fetchCurrentOfferAction.rejected" if API call fails', async () => {
      const fakeOfferId = '123';
      mockAxiosAdapter.onGet(APIRoute.GetOffer.replace(':offerId', fakeOfferId)).reply(500);

      await store.dispatch(fetchCurrentOfferAction(fakeOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentOfferAction.pending.type,
        fetchCurrentOfferAction.rejected.type,
      ]);
    });
  });


  describe('fetchCurrentNearbyOffersAction', () => {
    it('should dispatch "fetchCurrentNearbyOffersAction.pending" and "fetchCurrentNearbyOffersAction.fulfilled" with successful API call', async () => {
      const fakeOfferId = '123';
      const fakeNearbyOffers = Array.from({ length: 5 }, () => makeFakeBriefOffer());
      mockAxiosAdapter.onGet(APIRoute.GetOfferNearby.replace(':offerId', fakeOfferId)).reply(200, fakeNearbyOffers);

      await store.dispatch(fetchCurrentNearbyOffersAction(fakeOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentNearbyOffersAction.pending.type,
        fetchCurrentNearbyOffersAction.fulfilled.type,
      ]);

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({type: fetchCurrentNearbyOffersAction.fulfilled.type, payload: fakeNearbyOffers}),
        ])
      );
    });

    it('should dispatch "fetchCurrentNearbyOffersAction.pending" and "fetchCurrentNearbyOffersAction.rejected" if API call fails', async () => {
      const fakeOfferId = '123';
      mockAxiosAdapter.onGet(APIRoute.GetOfferNearby.replace(':offerId', fakeOfferId)).reply(500);

      await store.dispatch(fetchCurrentNearbyOffersAction(fakeOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentNearbyOffersAction.pending.type,
        fetchCurrentNearbyOffersAction.rejected.type,
      ]);
    });
  });


  describe('fetchCurrentReviewsAction', () => {
    it('should dispatch "fetchCurrentReviewsAction.pending" and "fetchCurrentReviewsAction.fulfilled" with successful API call', async () => {
      const fakeOfferId = '123';
      const fakeReviews = Array.from({ length: 5 }, () => makeFakeReview());
      mockAxiosAdapter.onGet(APIRoute.GetComments.replace(':offerId', fakeOfferId)).reply(200, fakeReviews);

      await store.dispatch(fetchCurrentReviewsAction(fakeOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentReviewsAction.pending.type,
        fetchCurrentReviewsAction.fulfilled.type,
      ]);

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({type: fetchCurrentReviewsAction.fulfilled.type, payload: fakeReviews}),
        ])
      );
    });

    it('should dispatch "fetchCurrentReviewsAction.pending" and "fetchCurrentReviewsAction.rejected" if API call fails', async () => {
      const fakeOfferId = '123';
      mockAxiosAdapter.onGet(APIRoute.GetComments.replace(':offerId', fakeOfferId)).reply(500);

      await store.dispatch(fetchCurrentReviewsAction(fakeOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentReviewsAction.pending.type,
        fetchCurrentReviewsAction.rejected.type,
      ]);
    });
  });


  describe('fetchOfferDetails', () => {
    it('should dispatch all related actions for fetching offer details', async () => {
      const fakeOfferId = '123';

      await store.dispatch(fetchOfferDetails(fakeOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(
        expect.arrayContaining([
          clearCurrentOffer.type,
          clearCurrentNearbyOffers.type,
          clearCurrentReviews.type,
          fetchCurrentOfferAction.pending.type,
          fetchCurrentNearbyOffersAction.pending.type,
          fetchCurrentReviewsAction.pending.type,
        ])
      );
    });
  });


  describe('postReviewAction', () => {
    it('should dispatch "postReviewAction.pending" and "postReviewAction.fulfilled" with successful API call', async () => {
      const fakeOfferId = '123';
      const fakeReviewData = { rating: 5, comment: 'Great place!' };
      mockAxiosAdapter.onPost(APIRoute.PostComment.replace(':offerId', fakeOfferId)).reply(200);

      await store.dispatch(postReviewAction({ id: fakeOfferId, reviewData: fakeReviewData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postReviewAction.pending" and "postReviewAction.rejected" if API call fails', async () => {
      const fakeOfferId = '123';
      const fakeReviewData = { rating: 5, comment: 'Great place!' };
      mockAxiosAdapter.onPost(APIRoute.PostComment.replace(':offerId', fakeOfferId)).reply(500);

      await store.dispatch(postReviewAction({ id: fakeOfferId, reviewData: fakeReviewData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });


  describe('submitReviewAndUpdate', () => {
    it('should dispatch actions from both postReviewAction and fetchCurrentReviewsAction', async () => {
      const fakeOfferId = '123';
      const fakeReviewData = { rating: 5, comment: 'Great place!' };
      mockAxiosAdapter.onPost(APIRoute.PostComment.replace(':offerId', fakeOfferId)).reply(200);
      mockAxiosAdapter.onGet(APIRoute.GetComments.replace(':offerId', fakeOfferId)).reply(200, []);

      await store.dispatch(submitReviewAndUpdate({ id: fakeOfferId, reviewData: fakeReviewData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(
        expect.arrayContaining([
          postReviewAction.pending.type,
          postReviewAction.fulfilled.type,
          fetchCurrentReviewsAction.pending.type,
          fetchCurrentReviewsAction.fulfilled.type,
        ])
      );
    });

    it('should dispatch "postReviewAction.rejected" if posting review fails', async () => {
      const fakeOfferId = '123';
      const fakeReviewData = { rating: 5, comment: 'Great place!' };
      mockAxiosAdapter.onPost(APIRoute.PostComment.replace(':offerId', fakeOfferId)).reply(500);

      await store.dispatch(submitReviewAndUpdate({ id: fakeOfferId, reviewData: fakeReviewData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(
        expect.arrayContaining([
          postReviewAction.pending.type,
          postReviewAction.rejected.type,
        ])
      );
    });
  });


  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" with successful API call', async () => {
      const fakeFavorites = Array.from({ length: 5 }, () => makeFakeBriefOffer());
      mockAxiosAdapter.onGet(APIRoute.GetFavorite).reply(200, fakeFavorites);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({type: fetchFavoritesAction.fulfilled.type, payload: fakeFavorites}),
        ])
      );
    });

    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.rejected" if API call fails', async () => {
      mockAxiosAdapter.onGet(APIRoute.GetFavorite).reply(500);
      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });


  describe('updateFavoriteAction', () => {
    it('should dispatch actions related to updating favorite status and fetching offers', async () => {
      const fakeOfferId = '123';
      const fakeStatus = 1;
      mockAxiosAdapter.onPost(APIRoute.PostFavorite.replace(':offerId', fakeOfferId).replace(':statusId', fakeStatus.toString())).reply(200);
      mockAxiosAdapter.onGet(APIRoute.GetFavorite).reply(200, []);
      mockAxiosAdapter.onGet(APIRoute.GetOffers).reply(200, []);

      await store.dispatch(updateFavoriteAction({ favoriteId: fakeOfferId, status: fakeStatus }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(
        expect.arrayContaining([
          updateFavoriteAction.pending.type,
          fetchFavoritesAction.pending.type,
          fetchOffersAction.pending.type,
          updateFavoriteAction.fulfilled.type,
          fetchFavoritesAction.fulfilled.type,
          fetchOffersAction.fulfilled.type,
        ])
      );
    });

    it('should dispatch "updateFavoriteAction.pending" and "updateFavoriteAction.rejected" if API call fails', async () => {
      const fakeOfferId = '123';
      const fakeStatus = 1;
      mockAxiosAdapter.onPost(APIRoute.PostFavorite.replace(':offerId', fakeOfferId).replace(':statusId', fakeStatus.toString())).reply(500);

      await store.dispatch(updateFavoriteAction({ favoriteId: fakeOfferId, status: fakeStatus }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        updateFavoriteAction.pending.type,
        updateFavoriteAction.rejected.type,
      ]);
    });
  });


  describe('updateFavoriteCurrentOfferAction', () => {
    it('should dispatch actions related to updating favorite status and fetching offers and current offer', async () => {
      const fakeOfferId = '123';
      const fakeStatus = 1;
      mockAxiosAdapter.onPost(APIRoute.PostFavorite.replace(':offerId', fakeOfferId).replace(':statusId', fakeStatus.toString())).reply(200);
      mockAxiosAdapter.onGet(APIRoute.GetFavorite).reply(200, []);
      mockAxiosAdapter.onGet(APIRoute.GetOffers).reply(200, []);
      mockAxiosAdapter.onGet(APIRoute.GetOffer.replace(':offerId', fakeOfferId)).reply(200, {});

      await store.dispatch(updateFavoriteCurrentOfferAction({ favoriteId: fakeOfferId, status: fakeStatus, currentOfferId: fakeOfferId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(
        expect.arrayContaining([
          updateFavoriteCurrentOfferAction.pending.type,
          fetchFavoritesAction.pending.type,
          fetchOffersAction.pending.type,
          fetchCurrentOfferAction.pending.type,
          updateFavoriteCurrentOfferAction.fulfilled.type,
          fetchFavoritesAction.fulfilled.type,
          fetchOffersAction.fulfilled.type,
          fetchCurrentOfferAction.fulfilled.type,
        ])
      );
    });

    it('should dispatch "updateFavoriteCurrentOfferAction.pending" and "updateFavoriteCurrentOfferAction.rejected" if API call fails', async () => {
      const fakeOfferId = '123';
      const fakeStatus = 1;
      mockAxiosAdapter.onPost(APIRoute.PostFavorite.replace(':offerId', fakeOfferId).replace(':statusId', fakeStatus.toString())).reply(500);

      await store.dispatch(updateFavoriteCurrentOfferAction({ favoriteId: fakeOfferId, status: fakeStatus, currentOfferId: fakeOfferId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        updateFavoriteCurrentOfferAction.pending.type,
        updateFavoriteCurrentOfferAction.rejected.type,
      ]);
    });
  });


  describe('updateFavoriteCurrentNearbyOfferAction', () => {
    it('should dispatch actions related to updating favorite status and fetching nearby offers', async () => {
      const fakeOfferId = '123';
      const fakeStatus = 1;
      mockAxiosAdapter.onPost(APIRoute.PostFavorite.replace(':offerId', fakeOfferId).replace(':statusId', fakeStatus.toString())).reply(200);
      mockAxiosAdapter.onGet(APIRoute.GetFavorite).reply(200, []);
      mockAxiosAdapter.onGet(APIRoute.GetOffers).reply(200, []);
      mockAxiosAdapter.onGet(APIRoute.GetOfferNearby.replace(':offerId', fakeOfferId)).reply(200, []);

      await store.dispatch(updateFavoriteCurrentNearbyOfferAction({ favoriteId: fakeOfferId, status: fakeStatus, currentOfferId: fakeOfferId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(
        expect.arrayContaining([
          updateFavoriteCurrentNearbyOfferAction.pending.type,
          fetchFavoritesAction.pending.type,
          fetchOffersAction.pending.type,
          fetchCurrentNearbyOffersAction.pending.type,
          updateFavoriteCurrentNearbyOfferAction.fulfilled.type,
          fetchFavoritesAction.fulfilled.type,
          fetchOffersAction.fulfilled.type,
          fetchCurrentNearbyOffersAction.fulfilled.type,
        ])
      );
    });

    it('should dispatch "updateFavoriteCurrentOfferAction.pending" and "updateFavoriteCurrentOfferAction.rejected" if API call fails', async () => {
      const fakeOfferId = '123';
      const fakeStatus = 1;
      mockAxiosAdapter.onPost(APIRoute.PostFavorite.replace(':offerId', fakeOfferId).replace(':statusId', fakeStatus.toString())).reply(500);

      await store.dispatch(updateFavoriteCurrentNearbyOfferAction({ favoriteId: fakeOfferId, status: fakeStatus, currentOfferId: fakeOfferId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        updateFavoriteCurrentNearbyOfferAction.pending.type,
        updateFavoriteCurrentNearbyOfferAction.rejected.type,
      ]);
    });
  });


});
