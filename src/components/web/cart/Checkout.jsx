// Checkout.jsx

import React, { useContext, useState } from 'react';
import { CartContext } from '../context/Cart.jsx';
import { useQuery } from 'react-query';

function Checkout() {
  const { getCartContext, count, deleteallCartContext } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: cartData, isLoading: isCartLoading, error: cartError } = useQuery("cart", getCartContext);

  const handleCheckout = async () => {
    if (count === 0) {
      setErrorMessage('There are no items in the cart.');
      return;
    }

    await deleteallCartContext();
    alert('Purchase completed successfully!');
  };

  return (
    <div className="container checkout-container">
      <h2>Order Summary</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {count > 0 ? (
        <div>
          <div className="row">
            <div className="col-md-6">
              <div className="checkout-summary">
                <p>Number of items in the cart: {count}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {isCartLoading && <p>Loading cart...</p>}
              {cartError && <div className="alert alert-danger">Error loading cart data</div>}
              {!isCartLoading && !cartError && (
                <ul className="list-group">
                  {cartData.products.map((item) => (
                    <li key={item.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail"
                            style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                          />
                          {item.name}
                        </div>
                        <span className="badge badge-primary badge-pill">{item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button className="btn btn-primary" onClick={handleCheckout}>
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Checkout;
