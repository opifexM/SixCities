import {ChangeEvent} from 'react';

interface ReviewRatingProps {
  value: number;
  title: string;
  onRatingChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  isDisabled: boolean;
}

function ReviewRating({value, title, onRatingChange, checked, isDisabled}: Readonly<ReviewRatingProps>) {
  return (
    <>
      <input onChange={onRatingChange}
        data-testid="rating-input"
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={checked}
        disabled={isDisabled}
      >
      </input>
      <label htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default ReviewRating;
