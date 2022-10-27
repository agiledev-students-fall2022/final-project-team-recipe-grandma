import React from 'react';

type Props = $ReadOnly<{|
  review: {
    name: string,
    date: string,
    image: string
  }
|}>;

function RecipeUpload(props: Props): React.Node {
  const { review } = props;
  return (
    <article className="review container">
      <h2>{review.name}</h2>
      <h3>{review.date}</h3>
      <img src={review.image} alt="" />
    </article>
  );
}

export default RecipeUpload;
