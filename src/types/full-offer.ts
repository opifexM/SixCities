import {BriefOffer} from './brief-offer.ts';
import {Host} from './host.ts';

export interface FullOffer extends BriefOffer {
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  images: string[];
  host: Host;
}
