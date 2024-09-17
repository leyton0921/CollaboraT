"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../auth/styles/login.module.css';  
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
      console.log('User:', user);
      router.push('/admin');
    } else {
      setError('Login failed: Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <Input
        label="Username:"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input} placeholder={''}      />
      <Input
        label="Password:"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input} placeholder={''}      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        type="submit"
        label="Login"
        className={styles.button} 
        onClick={function (): void {
         console.log("Button clicked");
        } }      />
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default LoginForm;
