// Orders.jsx

import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import styles from './orders.module.css';
import { OrderContext } from '../context/Order.jsx';


function Orders() {
  const orderContext = useContext(OrderContext);

  const { data, isLoading, error } = useQuery('orders', orderContext.getOrders);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error fetching orders:', error);
    return <p>Error fetching orders</p>;
  }

  return (
    <div className={styles.ordersContainer}>
      <h2>Orders Page</h2>

    </div>
  );
}

export default Orders;
