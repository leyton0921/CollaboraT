"use client"
import React, { useState } from 'react';
import styles from './Home.module.css'; // Asegúrate de crear un archivo CSS con los estilos

const HomePage = () => {
  // Estado para controlar la visibilidad del menú desplegable
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <h1 onClick={toggleMenu} className={styles.logo}>
          Collaborat
        </h1>
      </header>

      {/* Menú desplegable */}
      {isMenuVisible && (
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a href="#about" className={styles.navLink}>Quiénes Somos</a>
            </li>
            <li>
              <a href="#features" className={styles.navLink}>Lo que Buscamos</a>
            </li>
            <li>
              <a href="/register" className={styles.navButton}>Registro</a>
            </li>
            <li>
              <a href="/login" className={styles.navButton}>Login</a>
            </li>
          </ul>
        </nav>
      )}

      {/* Sección Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Organiza y Optimiza tu Colaboración con Facilidad</h2>
          <p className={styles.heroSubtitle}>Collaborat: La herramienta perfecta para que tu equipo esté en sintonía y al tanto de cada tarea.</p>
          <div className={styles.heroButtons}>
            <a href="/register" className={styles.primaryButton}>Comienza Ahora</a>
            <a href="#features" className={styles.secondaryButton}>Descubre Más</a>
          </div>
        </div>
      </section>

      {/* Sección Quiénes Somos */}
      <section id="about" className={styles.about}>
        <h2 className={styles.sectionTitle}>Quiénes Somos</h2>
        <p className={styles.sectionContent}>
          En Collaborat, nos dedicamos a mejorar la eficiencia de tu equipo mediante una plataforma de gestión de tareas simple y efectiva.
        </p>
      </section>

      {/* Sección Lo que Buscamos */}
      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>Lo que Buscamos</h2>
        <div className={styles.featureList}>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Gestión de Tareas</h3>
            <p className={styles.featureDescription}>Organiza las tareas de tu equipo con facilidad y claridad.</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Seguimiento en Tiempo Real</h3>
            <p className={styles.featureDescription}>Sigue el progreso de cada tarea y proyecto en tiempo real.</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Colaboración Efectiva</h3>
            <p className={styles.featureDescription}>Facilita la comunicación y la colaboración entre los miembros del equipo.</p>
          </div>
        </div>
      </section>

      {/* Pie de Página */}
      <footer className={styles.footer}>
        <ul className={styles.footerList}>
          <li><a href="#about" className={styles.footerLink}>Quiénes Somos</a></li>
          <li><a href="#features" className={styles.footerLink}>Lo que Buscamos</a></li>
          <li><a href="/privacy-policy" className={styles.footerLink}>Política de Privacidad</a></li>
          <li><a href="/terms-of-service" className={styles.footerLink}>Términos de Servicio</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;
