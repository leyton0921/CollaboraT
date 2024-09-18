"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../auth/styles/auth.module.css';
import { registerUser } from '../../controllers/register.controller'; // Importar el controlador

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nit, setNit] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setWelcomeMessage(null); // Reiniciar el mensaje de bienvenida

    const { user, message } = await registerUser(name, email, password, nit);

    if (user) {
      setWelcomeMessage('Welcome! Redirecting to login...'); // Mensaje de bienvenida
      setTimeout(() => router.push('/login'), 3000);
    } else {
      setError(message || 'Registration failed');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirigir inmediatamente al login
  };

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className={styles.box}>
      <div className={styles.registerTab}>
        <div className={styles.col}>Register</div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="name">Name:</label>
            <button type="button" onClick={nextStep} className={styles.btn}>Next</button>
          </div>
        )}
        {step === 2 && (
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email:</label>
            <button type="button" onClick={prevStep} className={styles.btn}>Back</button>
            <button type="button" onClick={nextStep} className={styles.btn}>Next</button>
          </div>
        )}
        {step === 3 && (
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
            <button type="button" onClick={nextStep} className={styles.btn}>Next</button>
          </div>
        )}
        {step === 4 && (
          <div className={styles.formGroup}>
            <input
              type="text"
              id="nit"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="nit">NIT:</label>
            <button type="button" onClick={prevStep} className={styles.btn}>Back</button>
            <button type="submit" className={styles.btn}>Register</button>
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {welcomeMessage && <p className={styles.success}>{welcomeMessage}</p>} {/* Mensaje de bienvenida */}
      </form>
    </div>
  );
};

export default RegisterForm;
