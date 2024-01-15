import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "../components/web/home/Home.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import CategoriesDetails from "../components/web/categories/CategoryDetails.jsx";
import Register from "../components/web/register/Register.jsx";
import Login from "../components/web/login/Login.jsx";
import ForgotPassword from "../components/web/auth/ForgotPassword.jsx";
import SendCode from "../components/web/auth/SendCode.jsx";
import ProtectedRouter from "../components/web/protectedRouter/ProtectedRouter.jsx";
import Cart from "../components/web/cart/Cart.jsx";
import Product from "../components/web/products/Product.jsx";
import ProductList from "../components/web/products/ProductList.jsx";
import Checkout from "../components/web/cart/Checkout.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import Orders from "../components/web/profile/Orders.jsx";

// import CartItem from "../components/web/cart/CartItem.jsx";
// import DashbardLayout from "./DashbardLayout.jsx";
// import Profile from "../components/web/profile/Profile.jsx";
// import UserInfo from "../components/web/profile/UserInfo.jsx";
// import UserContact from "../components/web/profile/UserContact.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'profile',
                element: <Profile />,
                children: [
                    {
                        path: 'info',
                        element: <UserInfo />
                    }, {
                        path: 'contact',
                        element: <UserContact />
                    }, {
                        path: 'orders',
                        element: <Orders />
                    }
                ]
            },
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'sendCode',
                element: <SendCode />,
            },
            {
                path: 'forgotPassword',
                element: <ForgotPassword />,
            },
            {
                path: 'cart',
                element:
                    <ProtectedRouter>
                        <Cart />
                    </ProtectedRouter>

            },
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'products/category/:categoryId',
                element: <CategoriesDetails />
            },
            {
                path: 'product/:productId',
                element: <Product />
            }
            ,
            {
                path: 'productList/:page?/:limit?',
                element: <ProductList />
            }
            ,
            {
                path: 'checkout',
                element: <Checkout />
            },
            {
                path: '*',
                element: <h2>page not fond --- web</h2>
            }

        ]
    },
    // {
    //     path: "/dashboard",
    //     element: <DashbardLayout />,
    //     children: [
    //         {
    //             path: '*',
    //             element: <h2>page not fond --- dashboard</h2>
    //         }
    //     ]
    // }
])