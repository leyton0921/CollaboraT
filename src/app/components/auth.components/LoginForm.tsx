"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../auth/styles/auth.module.css';  
import { authenticateUser } from '../../controllers/login.controllers'; // Importar el controlador
import Input from '../../components/ui.commponents/input';
import Button from '../../components/ui.commponents/button';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    const result = await authenticateUser(email, password);

    if (result) {
      const { user, token } = result;
      setMessage('Login successful');
      localStorage.setItem('token', token);
      console.log('user:', user);
      router.push('/admin');
    } else {
      setError('Login failed: Invalid email or password');
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.loginTab}>
        <div className={styles.col}>Login</div>
      </div>
      <form onSubmit={handleSubmit}>
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
        </div>
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
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.btn}>Login</button>
        {message && <p className={styles.success}>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;