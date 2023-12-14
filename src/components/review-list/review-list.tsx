import {Review} from '../../types/review.ts';
import ReviewComment from '../review-comment/review-comment.tsx';

const dataOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long'
};

interface ReviewPageProps {
  reviews: Review[];
  reviewCount: number;
}

function ReviewList({reviews, reviewCount}: Readonly<ReviewPageProps>) {
  const commentList = reviews.map((review) => (
    <ReviewComment
      key={review.id}
      review={review}
      dataOptions={dataOptions}
    />
  ));

  return (
    <>
      <h2 className="reviews__title">
            Reviews &middot; <span className="reviews__amount">{reviewCount}</span>
      </h2>
      <ul className="reviews__list">
        {commentList}
      </ul>
    </>
  );
}

export default ReviewList;
