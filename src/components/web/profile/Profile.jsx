// Profile.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UUser.jsx';
import { NavLink, Outlet} from 'react-router-dom';

import styles from './profile.module.css';

function Profile() {
  const { data, loading } = useContext(UserContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.sidebar}>
        <div className={styles.profileLinks}>
          <nav>
            <NavLink to="info" activeClassName={styles.activeLink}>
              Info
            </NavLink>
            <NavLink to="contact" activeClassName={styles.activeLink}>
              Contact
            </NavLink>
            <NavLink to="orders" activeClassName={styles.activeLink}>
              Orders
            </NavLink>
          </nav>
        </div>
      </div>

      <div className={styles.profileContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
