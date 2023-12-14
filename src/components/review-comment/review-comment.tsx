import {Review} from '../../types/review.ts';

interface ReviewCommentProps {
  review: Review;
  dataOptions: Intl.DateTimeFormatOptions;
}

function ReviewComment({review, dataOptions}: Readonly<ReviewCommentProps>) {
  const {comment, rating} = review;
  const date = new Date(review.date);
  const {avatarUrl: userAvatarUrl, name: userName} = review.user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar"
            src={userAvatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          >
          </img>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date.toISOString()}>{date.toLocaleDateString('en', dataOptions)}</time>
      </div>
    </li>
  );
}

export default ReviewComment;
