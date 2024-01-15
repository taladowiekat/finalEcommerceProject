import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartContextProvider } from './components/web/context/Cart.jsx';
import UserContextProvider from './components/web/context/UUser.jsx';
import { OrderContextProvider } from './components/web/context/Order.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <UserContextProvider>
      <CartContextProvider>
        <OrderContextProvider>
          <QueryClientProvider client={queryClient}>
            {/* <ToastContainer /> */}
            <App />
          </QueryClientProvider>
        </OrderContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </>
);
