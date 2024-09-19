"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../auth/styles/auth.module.css';  
import { authenticateUser } from '../../controllers/login.controllers'; // Importar el controlador

const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null); // Mensaje de bienvenida
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWelcomeMessage(null); // Reiniciar el mensaje de bienvenida
    setError(null);
    setLoading(false); // Reiniciar estado de carga

    const result = await authenticateUser(email, password);

    if (result) {
      const { user, token } = result;
      setWelcomeMessage(`hello welcome to collaborat, ${user.name}!`); 
      localStorage.setItem('token', token);
      console.log('user:', user);
      setLoading(true); // Activar la carga

      setTimeout(() => {
        router.push('/admin');
      }, 3000); // Redirigir después de 3 segundos
    } else {
      setError('Login failed: Invalid email or password');
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register'); // Cambia la ruta según sea necesario
  };

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 2));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className={styles.box}>
      <div className={styles.loginTab}>
        <div className={styles.col}>Login</div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formGroup}>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="email">Username:</label>
            <button type="button" onClick={nextStep} className={styles.btn}>Next</button>
          </div>
        )}
        {step === 2 && (
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password:</label>
            <button type="button" onClick={prevStep} className={styles.btn}>Back</button>
            <button type="submit" className={styles.btn}>Login</button>
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {loading && (
          <div className={styles.loadingContainer}>
            <p>{welcomeMessage}</p>
            <div className={styles.loadingBar} />
          </div>
        )}
      </form>
      <style jsx>{`
        .loadingContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        .loadingBar {
          width: 100%;
          height: 5px;
          background-color: #0070f3;
          animation: loadingAnimation 3s linear forwards;
        }
        @keyframes loadingAnimation {
          0% { width: 0; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
