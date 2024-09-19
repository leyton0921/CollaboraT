"use client"; 
import React, { useState } from 'react'; 
import styled from 'styled-components'; 
import Link from 'next/link'; 

// Colores en tonos de verde 
const primaryGreen = '#00A64E'; 
const secondaryGreen = '#008f44'; 
const lightGreen = '#e8f5e9'; 
const darkGreen = '#004d26'; 

const Container = styled.div` 
  font-family: 'Segoe UI', 'Arial', sans-serif; 
  width: 100%; 
  min-height: 100vh; 
  background-color: ${lightGreen}; 
  color: ${darkGreen}; 
  display: flex; 
  flex-direction: column; 
  margin: 0; // Elimina márgenes del contenedor
  padding: 0; // Elimina paddings del contenedor
  overflow-x: hidden; // Evita el desbordamiento horizontal
`; 

const Header = styled.header` 
  width: 100%; 
  background-color: ${primaryGreen}; 
  padding: 15px 20px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); 
`; 

const Logo = styled.div` 
  font-size: 28px; 
  cursor: pointer; 
  color: white; 
`; 

const HamburgerIcon = styled.div` 
  display: none; 
  cursor: pointer; 
  width: 30px; 
  height: 20px; 
  position: relative; 

  @media (max-width: 768px) { 
    display: block; 
  } 

  span { 
    display: block; 
    position: absolute; 
    height: 3px; 
    width: 100%; 
    background: white; 
    border-radius: 3px; 
    left: 0; 
    transition: .25s ease-in-out; 
  } 

  span:nth-child(1) { 
    top: 0; 
  } 
  span:nth-child(2) { 
    top: 8px; 
  } 
  span:nth-child(3) { 
    top: 16px; 
  } 
`; 

const Nav = styled.nav` 
  position: absolute; 
  top: 70px; 
  right: 20px; 
  background-color: white; 
  border: 1px solid ${secondaryGreen}; 
  padding: 15px; 
  display: ${props => props.isVisible ? 'flex' : 'none'}; 
  flex-direction: column; 
  border-radius: 10px; 
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); 
  z-index: 10; 
`; 

const NavList = styled.ul` 
  list-style: none; 
  padding: 0; 
  margin: 0; 
  display: flex; 
  flex-direction: column; 
`; 

const NavLink = styled(Link)` 
  text-decoration: none; 
  color: ${primaryGreen}; 
  padding: 10px 0; 
  font-size: 16px; 
  &:hover { 
    color: ${secondaryGreen}; 
  } 
`; 

const NavButton = styled(Link)` 
  text-decoration: none; 
  color: white; 
  background-color: ${primaryGreen}; 
  padding: 12px; 
  border-radius: 8px; 
  text-align: center; 
  display: block; 
  margin-top: 15px; 
  &:hover { 
    background-color: ${secondaryGreen}; 
  } 
`; 

const Hero = styled.section` 
  width: 100%; 
  background-color: ${primaryGreen}; 
  padding: 80px 20px; 
  text-align: center; 
  color: white; 
  clip-path: ellipse(100% 90% at 50% 10%); 

  @media (min-width: 768px) { 
    padding: 120px 20px; 
    clip-path: ellipse(100% 80% at 50% 20%); 
  } 
`; 

const HeroContent = styled.div` 
  max-width: 800px; 
  margin: 0 auto; 
`; 

const HeroTitle = styled.h2` 
  font-size: 28px; 
  margin: 0; 

  @media (min-width: 768px) { 
    font-size: 36px; 
  } 
`; 

const HeroSubtitle = styled.p` 
  font-size: 18px; 
  margin-top: 10px; 
  margin-bottom: 30px; 

  @media (min-width: 768px) { 
    font-size: 20px; 
  } 
`; 

const HeroButtons = styled.div` 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 20px; 

  @media (max-width: 768px) { 
    display: none; 
  } 

  @media (min-width: 768px) { 
    flex-direction: row; 
    justify-content: center; 
  } 
`; 

const HeroButton = styled.span` 
  background-color: white; 
  color: ${primaryGreen}; 
  padding: 15px 30px; 
  border-radius: 8px; 
  text-decoration: none; 
  font-weight: bold; 
  cursor: pointer; 
  &:hover { 
    background-color: ${secondaryGreen}; 
    color: white; 
  } 
`; 

const SecondaryButton = styled.span` 
  background-color: ${secondaryGreen}; 
  color: white; 
  padding: 15px 30px; 
  border-radius: 8px; 
  text-decoration: none; 
  cursor: pointer; 
  &:hover { 
    background-color: ${darkGreen}; 
  } 
`; 

const About = styled.section` 
  width: 100%; 
  padding: 50px 20px; 
  text-align: center; 
  background-color: white; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
`; 

const Features = styled.section` 
  width: 100%; 
  padding: 50px 20px; 
  text-align: center; 
  background-color: ${lightGreen}; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
`; 

const SectionTitle = styled.h2` 
  font-size: 28px; 
  margin-bottom: 20px; 
  color: ${primaryGreen}; 
`; 

const FeatureList = styled.div` 
  display: flex; 
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 20px; 
  width: 100%; 
`; 

const Feature = styled.div` 
  flex: 1 1 300px; 
  max-width: 300px; 
  padding: 15px; 
  background-color: ${lightGreen}; 
  border-radius: 10px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05); 
  text-align: center; 
`; 

const FeatureTitle = styled.h3` 
  font-size: 20px; 
  margin-bottom: 10px; 
  color: ${secondaryGreen}; 
`; 

const Footer = styled.footer` 
  width: 100%; 
  background-color: ${primaryGreen}; 
  padding: 15px; 
  text-align: center; 
  color: white; 
  margin-top: auto; 
`; 

const FooterList = styled.ul` 
  list-style: none; 
  padding: 0; 
  display: flex; 
  flex-wrap: wrap; 
  justify-content: center; 
`; 

const FooterLink = styled(Link)` 
  text-decoration: none; 
  color: white; 
  margin: 5px 10px; 
  &:hover { 
    color: ${secondaryGreen}; 
  } 
`; 

const HomePage = () => { 
  const [isMenuVisible, setIsMenuVisible] = useState(false); 

  const toggleMenu = () => { 
    setIsMenuVisible(!isMenuVisible); 
  }; 

  return ( 
    <Container> 
      <Header> 
        <Logo>Collaborat</Logo> 
        <HamburgerIcon onClick={toggleMenu}> 
          <span></span> 
          <span></span> 
          <span></span> 
        </HamburgerIcon> 
      </Header> 

      <Nav isVisible={isMenuVisible}> 
        <NavList> 
          <li> 
            <NavLink href="#about">Quiénes Somos</NavLink> 
          </li> 
          <li> 
            <NavLink href="#features">Lo que Buscamos</NavLink> 
          </li> 
          <li> 
            <NavButton href="/register">Registro</NavButton> 
          </li> 
          <li> 
            <NavButton href="/login">Login</NavButton> 
          </li> 
        </NavList> 
      </Nav> 

      <Hero> 
        <HeroContent> 
          <HeroTitle>Organiza y Optimiza tu Colaboración con Facilidad</HeroTitle> 
          <HeroSubtitle>Collaborat: La herramienta perfecta para que tu equipo esté en sintonía y al tanto de cada tarea.</HeroSubtitle> 
          <HeroButtons> 
            <Link href="/register" passHref> 
              <HeroButton>Soy Empresa</HeroButton> 
            </Link> 
            <Link href="/login" passHref> 
              <SecondaryButton>Soy Colaborador</SecondaryButton> 
            </Link> 
          </HeroButtons> 
        </HeroContent> 
      </Hero> 

      <About id="about"> 
        <SectionTitle>Quiénes Somos</SectionTitle> 
        <p>En Collaborat, nos dedicamos a mejorar la eficiencia de tu equipo mediante una plataforma de gestión de tareas simple y efectiva.</p> 
      </About> 

      <Features id="features"> 
        <SectionTitle>Lo que Buscamos</SectionTitle> 
        <FeatureList> 
          <Feature> 
            <FeatureTitle>Gestión de Tareas</FeatureTitle> 
            <p>Organiza las tareas de tu equipo con facilidad y claridad.</p> 
          </Feature> 
          <Feature> 
            <FeatureTitle>Seguimiento en Tiempo Real</FeatureTitle> 
            <p>Sigue el progreso de cada tarea y proyecto en tiempo real.</p> 
          </Feature> 
          <Feature> 
            <FeatureTitle>Colaboración Efectiva</FeatureTitle> 
            <p>Facilita la comunicación y la colaboración entre los miembros del equipo.</p> 
          </Feature> 
        </FeatureList> 
      </Features> 

      <Footer> 
        <FooterList> 
          <li> 
            <FooterLink href="#about">Quiénes Somos</FooterLink> 
          </li> 
          <li> 
            <FooterLink href="#features">Lo que Buscamos</FooterLink> 
          </li> 
          <li> 
            <FooterLink href="/privacy-policy">Política de Privacidad</FooterLink> 
          </li> 
          <li> 
            <FooterLink href="/terms-of-service">Términos de Servicio</FooterLink> 
          </li> 
        </FooterList> 
      </Footer> 
    </Container> 
  ); 
}; 

export default HomePage;