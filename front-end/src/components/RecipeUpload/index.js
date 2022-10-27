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
      <h1>{review.name}</h1>
      <h2>{review.date}</h2>
      <img src={review.image}/>
    </article>
  );
}

export default RecipeUpload;
