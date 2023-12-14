import {BriefOffer} from '../../types/brief-offer.ts';

const SortOptions = {
  POPULAR: {
    title: 'Popular',
    sortFn: (offers: BriefOffer[]) => offers
  },
  LOW_TO_HIGH: {
    title: 'Price: low to high',
    sortFn: (offers: BriefOffer[]) => offers.toSorted((a, b) => a.price - b.price)
  },
  HIGH_TO_LOW: {
    title: 'Price: high to low',
    sortFn: (offers: BriefOffer[]) => offers.toSorted((a, b) => b.price - a.price)
  },
  TOP_RATED_FIRST: {
    title: 'Top rated first',
    sortFn: (offers: BriefOffer[]) => offers.toSorted((a, b) => b.rating - a.rating)
  },
} as const;
export type SortOptionsType = keyof typeof SortOptions;

function sortOffers(offers: BriefOffer[], sortType: keyof typeof SortOptions): BriefOffer[] {
  return SortOptions[sortType].sortFn(offers);
}

export {SortOptions, sortOffers};

