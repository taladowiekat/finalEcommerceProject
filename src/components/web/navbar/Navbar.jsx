import React, { useContext } from 'react';
import style from './nav.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { UserContext } from '../context/UUser.jsx';
import { CartContext } from '../context/Cart.jsx';

function Navbar() {
    const navigate = useNavigate();
    const { userToken, setUserToken, userData, setUserData } = useContext(UserContext);
    const { count } = useContext(CartContext);

    const logout = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setUserData(null);
        navigate('/');
    };

    return (
        <nav className={`navbar navbar-expand-sm navbar-light ${style.neubar}`}>
            <div className="container">
                <Link className={`navbar-brand ${style.logo}`} to="/">
                    <span className={style.logo}>Tala</span>
                    <span className={style.shop}>Shop</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link mx-2 ${style.active}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/productList">Products</Link>
                        </li>
                        {userToken && (
                            <li className="nav-item">
                                <Link to="/cart" className={`nav-link mx-2 ${style.active}`}>
                                    <FiShoppingCart className="cart-trolley" />
                                    <span className="badge badge-light bg-danger position-relative">{count}</span>
                                </Link>
                            </li>
                        )}

                        <li className="nav-item dropdown">
                            <Link className="nav-link mx-2 dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userData !== null ? userData.userName : 'Account'}
                            </Link>
                            <ul className={`dropdown-menu ${style.dropdownMenu}`} aria-labelledby="navbarDropdownMenuLink">
                                {
                                    userToken == null ?
                                        (
                                            <>
                                                <li><Link className={`dropdown-item ${style.dropdownItem}`} to="/register">Register</Link></li>
                                                <li><Link className={`dropdown-item ${style.dropdownItem}`} to="/login">Login</Link></li>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <li><Link className={`dropdown-item ${style.dropdownItem}`} to="/profile">Profile</Link></li>
                                                <li><Link className={`dropdown-item ${style.dropdownItem}`} onClick={logout} to="/">Logout</Link></li>
                                            </>
                                        )
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
