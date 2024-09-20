"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { authenticateUser } from '../../controllers/login.controllers'; 
import styled, { keyframes } from 'styled-components';

const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWelcomeMessage(null);
    setError(null);
    setLoading(true);

    const result = await authenticateUser(email, password);

    if (result) {
      const { user, token } = result;
      setWelcomeMessage(`Hello, welcome to Collaborat, ${user.name}!`); 
      localStorage.setItem('token', token);
      console.log('user:', user);
      
      setTimeout(() => {
        router.push('/admin');
      }, 3000);
    } else {
      setError('Login failed: Invalid email or password');
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 2));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <Background>
      <Wrapper>
        <Box>
          <LoginTab>
            <Col>Hola, bienvenido a Collaborat</Col>
          </LoginTab>
          <form onSubmit={handleSubmit}>
            {welcomeMessage && <WelcomeMessage>{welcomeMessage}</WelcomeMessage>}
            {step === 1 && (
              <FormGroup>
                <Label htmlFor="email">Usuario:</Label>
                <Input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="button" onClick={nextStep}>Siguiente</Button>
              </FormGroup>
            )}
            {step === 2 && (
              <FormGroup>
                <Label htmlFor="password">Contraseña:</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <ButtonGroup>
                  <Button type="button" onClick={prevStep}>Volver</Button>
                  <Button type="submit">Iniciar sesión</Button>
                </ButtonGroup>
              </FormGroup>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {loading && (
              <LoadingContainer>
                <LoadingSpinner />
              </LoadingContainer>
            )}
            <RegisterLink onClick={handleRegisterRedirect}>
              Si es una empresa, regístrese
            </RegisterLink>
          </form>
        </Box>
      </Wrapper>
    </Background>
  );
};

// Styled Components
const softGreenColor = '#00c767';
const lighterGreenColor = '#00e080';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.301) url('/fondo collaborat.png') no-repeat center center;
  background-size: cover;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  font-family: 'Segoe UI', 'Arial', sans-serif; 
`;

const WelcomeMessage = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${softGreenColor};
  margin-bottom: 20px;
  text-align: center;
`;

const Box = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: ${softGreenColor};
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginTab = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Col = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px; /* Separación entre etiqueta y campo */
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${softGreenColor};
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px; /* Espaciado adicional entre el campo y el botón */
  background-color: white;
  color: ${softGreenColor};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
  &:hover {
    background-color: ${lighterGreenColor}; 
    color: white;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid ${softGreenColor};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const RegisterLink = styled.p`
  color: white;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

export default LoginForm;
