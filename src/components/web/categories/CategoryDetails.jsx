import React from 'react';
import axios from 'axios';
import ProductCard from '../shared/ProductCard.jsx';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styles from './categoryDetails.module.css';

const CategoriesDetails = () => {
    const { categoryId } = useParams();

    const getCategoryDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    };

    const { data, isLoading } = useQuery('categoryDetails', getCategoryDetails);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.categoriesDetailsContainer}>
            {
                data.length ? (
                    data.map(product => (
                        <section  key={product._id}>
                        <ProductCard product={product} />  
                        </section>
                    ))
                ) : (
                    <h2 className={styles.categoriesDetailsMessage}>No products available in this category.</h2>
                )
            }
        </div>
    );
};

export default CategoriesDetails;
