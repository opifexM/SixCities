import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import * as faker from 'faker';
import {createAPI} from '../../services/api.ts';
import {State} from '../../store/state.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import {City} from '../../types/city.ts';
import {FullOffer} from '../../types/full-offer.ts';
import {Review} from '../../types/review.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeCity = (): City => ({
  name: faker.address.cityName(),
  location: {
    latitude: faker.datatype.float({ min: -90, max: 90 }),
    longitude: faker.datatype.float({ min: -180, max: 180 }),
    zoom: faker.datatype.number({ min: 0, max: 18 }),
  }
});

export const makeFakeBriefOffer = (): BriefOffer => ({
  id: faker.datatype.uuid(),
  title: faker.animal.cat(),
  type: faker.random.arrayElement(['apartment', 'room', 'house', 'hotel']),
  price: faker.datatype.number(),
  city: makeFakeCity(),
  location: {
    latitude: faker.datatype.float({ min: -90, max: 90 }),
    longitude: faker.datatype.float({ min: -180, max: 180 }),
    zoom: faker.datatype.number({ min: 0, max: 18 }),
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
  previewImage: faker.image.imageUrl(),
});

export const makeFakeFullOffer = (): FullOffer => ({
  ...makeFakeBriefOffer(),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 10 }),
  maxAdults: faker.datatype.number({ min: 1, max: 10 }),
  goods: Array.from({ length: 10 }, () => `${faker.commerce.productName()}?${Date.now()}-${Math.random()}`),
  images: Array.from({ length: 10 }, () => `${faker.image.imageUrl()}?${Date.now()}-${Math.random()}`), host: {
    name: faker.name.findName(),
    isPro: faker.datatype.boolean(),
    avatarUrl: faker.image.avatar(),
  }
});

export const makeFakeReview = (): Review => ({
  id: faker.datatype.number(),
  user: {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    isPro: faker.datatype.boolean(),
    avatarUrl: faker.image.avatar(),
  },
  rating: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
  comment: faker.lorem.sentences(),
  date: faker.date.recent().toISOString()
});
