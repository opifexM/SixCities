export const OfferStatus = {
  LOADING: 'LOADING',
  EXISTS: 'EXISTS',
  NOT_EXISTS: 'NOT_EXISTS',
} as const;
export type OfferStatusType = typeof OfferStatus[keyof typeof OfferStatus];
