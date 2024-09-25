"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../controllers/register.controller';
import styled from 'styled-components';

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
    setWelcomeMessage(null);

    const { user, message } = await registerUser(name, email, password, nit);

    if (user) {
      setWelcomeMessage('¡Registro exitoso! Redirigiendo a inicio de sesión...');
      setTimeout(() => router.push('/login'), 3000);
    } else {
      setError(message || 'El registro falló');
    }
  };

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <Background>
      <Wrapper>
        <Box>
          <RegisterTab>
            <Col>Regístrese</Col>
          </RegisterTab>
          <form onSubmit={handleSubmit}>
            {welcomeMessage && <WelcomeMessage>{welcomeMessage}</WelcomeMessage>}
            {step === 1 && (
              <FormGroup>
                <Label htmlFor="name">Nombre de la empresa:</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Button type="button" onClick={nextStep}>Siguiente</Button>
              </FormGroup>
            )}
            {step === 2 && (
              <FormGroup>
                <Label htmlFor="email">Correo Electrónico:</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <ButtonGroup>
                  <Button type="button" onClick={prevStep}>Atrás</Button>
                  <Button type="button" onClick={nextStep}>Siguiente</Button>
                </ButtonGroup>
              </FormGroup>
            )}
            {step === 3 && (
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
                  <Button type="button" onClick={prevStep}>Atrás</Button>
                  <Button type="button" onClick={nextStep}>Siguiente</Button>
                </ButtonGroup>
              </FormGroup>
            )}
            {step === 4 && (
              <FormGroup>
                <Label htmlFor="nit">NIT:</Label>
                <Input
                  type="text"
                  id="nit"
                  value={nit}
                  onChange={(e) => setNit(e.target.value)}
                  required
                />
                <ButtonGroup>
                  <Button type="button" onClick={prevStep}>Atrás</Button>
                  <Button type="submit">Registrar</Button>
                </ButtonGroup>
              </FormGroup>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <LoginLink onClick={handleLoginRedirect}>
              Si ya está registrado, ingrese
            </LoginLink>
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

const RegisterTab = styled.div`
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

const LoginLink = styled.p`
  color: white;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

export default RegisterForm;