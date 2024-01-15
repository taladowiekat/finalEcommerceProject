import React from 'react';
import style from './Home.module.css';
import Categories from '../categories/Categories.jsx';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className={`col-md-6 ${style.col1}`}>
            <h1>Welcom to<br />TALA SHOP!</h1>
            <p>You can Explore our products from here</p>
              <Link to="/productList" className={style.btn}>Explore now &#8594;</Link>
          </div>
          <div className={`col-md-6 ${style.col2}`}>
            <img src="/public/shopping.jpg" alt="" className="img-fluid" />
          </div>
        </div>
      </div>
      <Categories />
    </>
  );
}

export default Home;
