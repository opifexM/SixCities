import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {AuthorizationStatus, AuthorizationStatusType, REVIEW_RATING} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {submitReviewAndUpdate} from '../../store/api-actions/data-api-actions.ts';
import {getIsReviewSubmitted} from '../../store/api-communication/api-communication.selectors.ts';
import {setReviewSubmitted} from '../../store/api-communication/api-communication.slice.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import ReviewRating from '../review-rating/review-rating.tsx';

interface ReviewFormProps {
  authorizationStatus: AuthorizationStatusType;
  offerId: BriefOffer['id'];
  minCommentLength: number;
  maxCommentLength: number;
}

function ReviewForm({
  authorizationStatus,
  offerId,
  minCommentLength = 0,
  maxCommentLength = 2500
}: Readonly<ReviewFormProps>) {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState({
    rating: 0,
    text: ''
  });
  const isReviewSubmitted = useAppSelector(getIsReviewSubmitted);

  useEffect(() => {
    if (isReviewSubmitted) {
      setComment({
        rating: 0,
        text: ''
      });
      dispatch(setReviewSubmitted(false));
    }
  }, [dispatch, isReviewSubmitted]);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  const handleRatingSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isNaN(Number(value))) {
      return;
    }

    setComment({
      ...comment,
      rating: parseInt(value, 10)
    });
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      ...comment,
      text: event.target.value
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!comment.text || !comment.rating) {
      return;
    }
    dispatch(submitReviewAndUpdate({
      id: offerId,
      reviewData: {
        comment: comment.text,
        rating: comment.rating
      }
    }));
  };

  const isSubmitDisabled =
    comment.text.length > maxCommentLength
    || comment.text.length < minCommentLength
    || comment.rating === 0;

  const ratingList = REVIEW_RATING.map((rating) => (
    <ReviewRating
      key={rating.value}
      value={rating.value}
      title={rating.title}
      onRatingChange={handleRatingSelect}
      checked={comment.rating === rating.value}
      isDisabled={isReviewSubmitted}
    />
  ));

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {ratingList}
      </div>
      <textarea onChange={handleTextChange}
        value={comment.text}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isReviewSubmitted}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe{' '}
          your stay with at least <b className="reviews__text-amount">{minCommentLength}</b>{' '}
          and no more than <b className="reviews__text-amount">{maxCommentLength} characters.</b>
        </p>
        <button className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isReviewSubmitted}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
