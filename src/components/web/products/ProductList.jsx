// ProductList.jsx
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './product.module.css';  // Import the styles

const fetchProducts = async (page) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError } = useQuery(['products', currentPage], () => fetchProducts(currentPage));

    if (isLoading) {
        return <div className={styles.container}>Loading...</div>;
    }

    if (isError) {
        return (
            <div className={styles.container}>
                <div className={`alert alert-danger ${styles.title}`} role="alert">
                    {isError.message}
                </div>
            </div>
        );
    }

    const { products } = data;

    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Product List</h1>
            <div className={`row ${styles.cardContainer}`}>
                {products.map((product) => (
                    <div key={product._id} className={`col-md-4 mb-4 container ${styles.card}`}>
                        <div>
                            <img
                                src={product.mainImage.secure_url}
                                alt={product.name}
                                className={`card-img-top ${styles.cardImg}`}
                            />
                            <div className="card-body">
                                <p className={styles.productInfo}>
                                    <span>Price: {product.price}</span>
                                    
                                </p>
                                <Link to={`/product/${product._id}`} className={`btn mb-4 ${styles.detailsBtn}`}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav aria-label="Page navigation example" className={styles.paginationContainer}>
                <ul className="pagination justify-content-center">
                    <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={`page-link ${styles.pageLink}`}
                        >
                            Previous
                        </button>
                    </li>

                    <li className={currentPage === 2 ? "page-item disabled" : "page-item"}>
                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className={`page-link ${styles.pageLink}`}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProductList;
