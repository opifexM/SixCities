import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReviewRating from '../../../components/review-rating/review-rating.tsx';

describe('Component: ReviewRating', () => {
  it('should render radio input correctly', () => {
    const mockOnRatingChange = vi.fn();
    const value = 5;
    const title = 'Excellent';

    render(
      <ReviewRating
        value={value}
        title={title}
        onRatingChange={mockOnRatingChange}
        checked
        isDisabled={false}
      />
    );

    const radioInput = screen.getByTestId('rating-input');

    expect(radioInput).toBeInTheDocument();
    expect(radioInput).toHaveAttribute('type', 'radio');
    expect(radioInput).toHaveAttribute('value', value.toString());
    expect(radioInput).toBeChecked();
    expect(radioInput).not.toBeDisabled();
  });

  it('should call onRatingChange when radio input is changed', () => {
    const mockOnRatingChange = vi.fn();
    const value = 5;
    const title = 'Excellent';

    render(
      <ReviewRating
        value={value}
        title={title}
        onRatingChange={mockOnRatingChange}
        checked={false}
        isDisabled={false}
      />
    );

    const radioInput = screen.getByTestId('rating-input');
    fireEvent.click(radioInput);

    expect(mockOnRatingChange).toHaveBeenCalled();
  });
});
