import {User} from './user.ts';

export interface Review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

