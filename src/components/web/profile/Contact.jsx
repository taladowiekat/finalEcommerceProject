// Contact.jsx

import React from 'react';
import styles from './contact.module.css';

function Contact() {
  return (
    <div className={styles.contactContainer}>
      <h2>Contact Page</h2>
      <form className={styles.contactForm}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
