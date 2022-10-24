import * as React from 'react';
import './ReviewForm.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SingleReview from './SingleReview';

function ReviewForm(): React.Node {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://raw.githubusercontent.com/geontackee/sample_reviews/main/Reviews.json',
      );
      setData(result.data);
    }
    fetchData();
  }, [data]);

  return (
    <div className="ReviewForm">
      <h1>Recipe Reviews</h1>
      <section className="Reviews">
        {Array.isArray(data)
          ? data.map((item) => (
            <SingleReview key={item.id} review={item} />
          ))
          : null}
      </section>
      <h1>Write Your Review</h1>
      <textarea
        type="text"
        placeholder="Write down your review"
      />
    </div>
  );
}

export default ReviewForm;
