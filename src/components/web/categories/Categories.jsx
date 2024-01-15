import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './categories.module.css'; 
import { Link } from 'react-router-dom';

function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=70`);
    return data;
  };

  const { data, isLoading } = useQuery('web_categories', getCategories);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="container py-5">
      
      <div className={styles.categoriesContainer}>
        <h3 className={`${styles.title} ${styles.animateTitle}`}>Our Categories</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={4.5}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 2000
          }}
        >
          {data?.categories.length ? data.categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link to={`/products/category/${category._id}`} className={styles.categoryLink}>
                <img src={category.image.secure_url} alt="" className={`py-5 ${styles.categoryImage}`} />
                <div className={styles.categoryOverlay}></div>
                <div className={styles.categoryDetails}>
                
                </div>
              </Link>
            </SwiperSlide>
          )) : <h2>No data available</h2>}
        </Swiper>
      </div>
    </section>
  );
}

export default Categories;
