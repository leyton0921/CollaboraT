"use client";
import React, { useState } from 'react';
import styles from './Home.module.css';

const HomePage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 onClick={toggleMenu} className={styles.logo}>
          Collaborat
        </h1>
      </header>

      {isMenuVisible && (
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a href="#about" className={styles.navLink}>About Us</a>
            </li>
            <li>
              <a href="#features" className={styles.navLink}>What We Seek</a>
            </li>
            <li>
              <a href="/register" className={styles.navButton}>Register</a>
            </li>
            <li>
              <a href="/login" className={styles.navButton}>Login</a>
            </li>
          </ul>
        </nav>
      )}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Organize and Optimize Your Collaboration with Ease</h2>
          <p className={styles.heroSubtitle}>Collaborat: The perfect tool for your team to stay in sync and on top of every task.</p>
          <div className={styles.heroButtons}>
            <a href="/register" className={styles.primaryButton}>Get Started Now</a>
            <a href="#features" className={styles.secondaryButton}>Learn More</a>
          </div>
        </div>
      </section>

      <section id="about" className={styles.about}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <p className={styles.sectionContent}>
          At Collaborat, we aim to improve your team's efficiency through a simple and effective task management platform.
        </p>
      </section>

      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>What We Seek</h2>
        <div className={styles.featureList}>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Task Management</h3>
            <p className={styles.featureDescription}>Easily and clearly organize your team's tasks.</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Real-Time Tracking</h3>
            <p className={styles.featureDescription}>Track the progress of each task and project in real time.</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Effective Collaboration</h3>
            <p className={styles.featureDescription}>Facilitate communication and collaboration among team members.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <ul className={styles.footerList}>
          <li><a href="#about" className={styles.footerLink}>About Us</a></li>
          <li><a href="#features" className={styles.footerLink}>What We Seek</a></li>
          <li><a href="/privacy-policy" className={styles.footerLink}>Privacy Policy</a></li>
          <li><a href="/terms-of-service" className={styles.footerLink}>Terms of Service</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;
