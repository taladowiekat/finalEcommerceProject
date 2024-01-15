import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => (
  <div className={styles.productCard}>
    <img src={product.mainImage.secure_url} alt={product.name} className={styles.productImage} />
    <p className={styles.productName}>{product.name}</p>
    <Link to={`/product/${product._id}`} className={styles.detailsButton}>View Details</Link>
  </div>
);

export default ProductCard;
