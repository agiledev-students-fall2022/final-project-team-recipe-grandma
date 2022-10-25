import * as React from 'react';
import './SingleReview.css';

type Props = $ReadOnly<{|
  review: {
    id: string,
    body: string,
    stars: number,
    username: string,
    userId: string,
    parentId: string,
    createdAt: string
  }
|}>;

function SingleReview(props: Props): React.Node {
  const { review } = props;
  return (
    <article className="review">
      <h3 className="username">{review.username}</h3>
      {[...Array(review.stars)].map((item, i) => (<h6 key={i} className="stars">⭐</h6>))}
      <h4 className="body">{review.body}</h4>
      <h5 className="time">{review.createdAt}</h5>
    </article>
  );
}

export default SingleReview;
