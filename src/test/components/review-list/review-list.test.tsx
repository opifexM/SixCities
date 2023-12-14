import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import ReviewList from '../../../components/review-list/review-list.tsx';
import {makeFakeReview} from '../../utils/mocks.ts';


describe('Component: ReviewList', () => {
  it('should render review count and reviews correctly', () => {
    const fakeReview = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
    const reviewCount = fakeReview.length;

    render(<ReviewList reviews={fakeReview} reviewCount={reviewCount} />);

    const reviewsTitle = screen.getByRole('heading', { name: /reviews/i });
    expect(reviewsTitle).toBeInTheDocument();

    const reviewsAmount = screen.getByText(reviewCount.toString(), { selector: '.reviews__amount' });
    expect(reviewsAmount).toBeInTheDocument();

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems).toHaveLength(reviewCount);
  });
});
