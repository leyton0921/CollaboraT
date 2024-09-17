"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../auth/styles/auth.module.css';
import { registerUser } from '../../controllers/register.controller'; // Importar el controlador

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nit, setNit] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { user, message } = await registerUser(name, email, password,nit);

    if (user) {
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => router.push('/login'), 3000); 
    } else {
      setError(message || 'Registration failed');
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.registerTab}>
        <div className={styles.col}>Register</div>
      </div>
      <form onSubmit={handleSubmit}>
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
        </div>
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
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit" className={styles.btn}>Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;