"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../auth/styles/auth.module.css';  
import { authenticateUser } from '../../controllers/login.controllers'; // Importar el controlador

const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null); // Mensaje de bienvenida
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWelcomeMessage(null); // Reiniciar el mensaje de bienvenida
    setError(null);

    const result = await authenticateUser(email, password);

    if (result) {
      const { user, token } = result;
      setWelcomeMessage(`Hola de nuevo, ${user.name}!`); // Mensaje de bienvenida
      localStorage.setItem('token', token);
      console.log('user:', user);
      setTimeout(() => router.push('/admin'), 3000); // Redirigir después de 3 segundos
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
        {welcomeMessage && <p className={styles.success}>{welcomeMessage}</p>} {/* Mensaje de bienvenida */}
      </form>
    </div>
  );
};

export default LoginForm;
