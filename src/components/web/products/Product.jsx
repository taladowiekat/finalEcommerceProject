// Product.jsx

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/Cart.jsx';
import styles from './product.module.css';
// import './Product.css';

// Import Formik components and Yup for validation
import { Formik, Field, Form, ErrorMessage } from 'formik';


function Product() {
  const { productId } = useParams();
  const { addToCartContext } = useContext(CartContext);
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
      console.log(data);
      return data.product;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching product');
    }
  };

  const { data, isLoading, isError } = useQuery('product', getProduct);

  const addToCart = async (productId) => {
    const res = await addToCartContext(productId);
    console.log(res);
  };

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return filledStars + emptyStars;
  };

  const submitReview = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`, values);
      console.log('Review Submission Response:', response);


      if (response.data.success) {
        const { user } = response.data;
        const newReview = {
          _id: response.data.review._id,
          createdBy: {
            userName: user.userName,
            image: user.image,
          },
          createdAt: new Date().toISOString(),
          ...values,
        };

        queryClient.setQueryData('product', (prevData) => ({
          ...prevData,
          reviews: [...prevData.reviews, newReview],
        }));
      }


      queryClient.invalidateQueries('product');
      setComment('');
      setRating(1);
    } catch (error) {
      console.error('Error submitting review:', error);

      if (error.response) {
        console.error('Error Response:', error.response.data);
      } else if (error.request) {
        console.error('No response received. Request details:', error.request);
      } else {
        console.error('Error details:', error.message);
      }
    }
  };


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching product</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {data.subImages.map((img, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={img.secure_url} className="d-block w-100" alt={`Product ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-lg-6">
            <h2 className="mb-3">{data.name}</h2>
            <p className="lead text-muted">{data.description}</p>
            <p className="fw-bold mt-3">Price: ${Number(data.price).toFixed(2)}</p>
            <button className={`btn ${styles.addToCartBtn}`} onClick={() => addToCart(data._id)}>
              Add To Cart
            </button>
          </div>
      </div>

      <h3 className="mt-4">Product Reviews</h3>
      {data.reviews && data.reviews.length > 0 ? (
        <div className="row mt-3">
          {data.reviews.map((review) => (
            <div key={review._id} className="col-md-6 mb-4">
              <div className={`card ${styles.reviewCard}`}>
                <div className={`card-body ${styles.reviewCardBody}`}>
                  <div className="d-flex align-items-center mb-3">
                    {review.createdBy.image && (
                      <img
                        src={review.createdBy.image.secure_url}
                        alt="Reviewer"
                        className="rounded-circle me-2"
                        style={{ width: '40px', height: '40px' }}
                      />
                    )}
                    <div>
                      <strong>{review.createdBy.userName}</strong>
                      <p className="ms-2 text-muted">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="mb-2">Rating: {renderStars(review.rating)}</p>
                  <p className="mb-0">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available for this product.</p>
      )}

      {/* Formik Review Form */}
      {/* <div className="row mt-4">
        <div className="col-md-6">
          <h4>Write a Review</h4>
          <Formik
            initialValues={{ comment: '', rating: 1 }}
            validationSchema={reviewSchema}
            onSubmit={(values, { resetForm }) => {
              // Handle form submission here
              submitReview(values);
              resetForm(); // Reset the form after submission
            }}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Comment:
                </label>
                <Field
                  type="textarea"
                  id="comment"
                  name="comment"
                  className="form-control"
                />
                <ErrorMessage name="comment" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating:
                </label>
                <Field
                  type="number"
                  id="rating"
                  name="rating"
                  className="form-control"
                  min="1"
                  max="5"
                />
                <ErrorMessage name="rating" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </Form>
          </Formik>
        </div>
      </div> */}
    </div>
  );
}

export default Product;
