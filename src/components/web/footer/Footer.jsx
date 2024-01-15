// Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={`mt-5 py-5 ${styles.footer}`}>
            <div className={styles.footerContent}>
                <h3 className={styles.title}>Ecommerce Site</h3>
                <p className={styles.description}>Your trusted online shopping destination.</p>
            </div>
            <div className={styles.footerSection}>
                <h4 className={styles.heading}>Contact Us</h4>
                <p className={styles.contactInfo}>
                    Email: <a href="mailto:info@ecommercesite.com" className={styles.link}>info@ecommercesite.com</a>
                </p>
                <p className={styles.contactInfo}>
                    Phone: <a href="tel:+11234567890" className={styles.link}>+1 123 456 7890</a>
                </p>
            </div>
            <div className={styles.footerSection}>
                <h4 className={styles.heading}>Follow Us</h4>
                <p className={styles.socialLinks}>
                    <a href="#" className={styles.socialIcon}><FaFacebook /></a>
                    <a href="#" className={styles.socialIcon}><FaTwitter /></a>
                    <a href="#" className={styles.socialIcon}><FaInstagram /></a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
