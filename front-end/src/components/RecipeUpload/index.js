import React from 'react';

type Props = $ReadOnly<{|
  review: {
    name: string,
    date: string,
    image: string
  }
|}>;

function SingleReview(props: Props): React.Node {
  const { review } = props;
  return (
    <article className="review container">
      <div className="review-header row">
        <div className="review-avatar col-md-3 col-3">
          <img src="https://picsum.photos/200" alt="AvatarPlaceholder" />
        </div>
        <div className="review-header-info col-md-9 col-9">
          <h3 className="username">{review.username}</h3>
          <h5 className="time">{review.createdAt}</h5>
          {[...Array(review.stars)].map((item, i) => (<h6 key={i} className="stars">⭐</h6>))}
        </div>
      </div>
      <div className="review-comment-info mt-4">
        <h4 className="body">{review.body}</h4>
      </div>
      <hr />
    </article>
  );
}

export default UserUpload;