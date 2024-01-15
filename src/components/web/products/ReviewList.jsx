// ReviewList.js

import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const ReviewList = ({ productId }) => {
  const fetchReviews = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}/reviews`);
    return data.reviews;
  };

  const { data: reviews, isLoading } = useQuery(['reviews', productId], fetchReviews);

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div>
      <h3>Product Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available for this product.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
