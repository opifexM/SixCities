export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
  OfferId: '/offer/:id',
} as const;
export type AppRouteType = typeof AppRoute[keyof typeof AppRoute];

export const APIRoute = {
  GetOffers: '/offers',
  GetOffer: '/offers/:offerId',
  GetOfferNearby: '/offers/:offerId/nearby',
  GetFavorite: '/favorite',
  PostFavorite: '/favorite/:offerId/:statusId',
  GetComments: '/comments/:offerId',
  PostComment: '/comments/:offerId',
  GetLogin: '/login',
  PostLogin: '/login',
  DeleteLogout: '/logout',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const ;
export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export const NameSpace = {
  SessionState: 'SESSION_STATE',
  ApiCommunication: 'API_COMMUNICATION',
  UserPreferences: 'USER_PREFERENCES',
} as const;

export const BACKEND_URL = 'https://14.design.pages.academy/six-cities';
export const BACKEND_REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const CommentLength = {
  MIN: 50,
  MAX: 300
};
export const MAX_RENT_OFFERS = 100;
export const MAX_OFFER_STARS = 5;
export const MAX_IMAGES_PER_OFFER = 6;
export const MAX_REVIEWS_PER_OFFER = 10;
export const MAX_NEAR_OFFERS = 3;
export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';
export const REVIEW_RATING = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

export const CITY_BY_DEFAULT = 'paris';
export const CITY_FOR_EMPTY_LIST =
    [
      {
        'name': 'Paris',
        'location': {
          'latitude': 48.85661,
          'longitude': 2.351499,
          'zoom': 13
        }
      },
      {
        'name': 'Cologne',
        'location': {
          'latitude': 50.938361,
          'longitude': 6.959974,
          'zoom': 13
        }
      },
      {
        'name': 'Brussels',
        'location': {
          'latitude': 50.846557,
          'longitude': 4.351697,
          'zoom': 13
        }
      },
      {
        'name': 'Amsterdam',
        'location': {
          'latitude': 52.37454,
          'longitude': 4.897976,
          'zoom': 13
        }
      },
      {
        'name': 'Hamburg',
        'location': {
          'latitude': 53.550341,
          'longitude': 10.000654,
          'zoom': 13
        }
      },
      {
        'name': 'Dusseldorf',
        'location': {
          'latitude': 51.225402,
          'longitude': 6.776314,
          'zoom': 13
        }
      }
    ];
