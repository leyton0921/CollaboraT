"use client"; 
import React, { useState } from 'react'; 
import styled from 'styled-components'; 
import Link from 'next/link'; 

// Colors in shades of green 
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
  margin: 0; 
  padding: 0; 
  overflow-x: hidden; 
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
  display: ${props => (props.isVisible ? 'flex' : 'none')}; 
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
    setIsMenuVisible(prev => !prev); 
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
            <NavLink href="#about">Who We Are</NavLink> 
          </li> 
          <li> 
            <NavLink href="#features">What We Seek</NavLink> 
          </li> 
          <li> 
            <NavButton href="/register">Register</NavButton> 
          </li> 
          <li> 
            <NavButton href="/login">Login</NavButton> 
          </li> 
        </NavList> 
      </Nav> 

      <Hero> 
        <HeroContent> 
          <HeroTitle>Organize and Optimize Your Collaboration with Ease</HeroTitle> 
          <HeroSubtitle>Collaborat: The perfect tool for your team to stay in sync and on top of every task.</HeroSubtitle> 
          <HeroButtons> 
            <Link href="/register" passHref> 
              <HeroButton>I Am a Company</HeroButton> 
            </Link> 
            <Link href="/login" passHref> 
              <SecondaryButton>I Am a Collaborator</SecondaryButton> 
            </Link> 
          </HeroButtons> 
        </HeroContent> 
      </Hero> 

      <About id="about"> 
        <SectionTitle>Who We Are</SectionTitle> 
        <p>At Collaborat, we focus on improving your team's efficiency through a simple and effective task management platform.</p> 
      </About> 

      <Features id="features"> 
        <SectionTitle>What We Seek</SectionTitle> 
        <FeatureList> 
          <Feature> 
            <FeatureTitle>Task Management</FeatureTitle> 
            <p>Easily and clearly organize your team's tasks.</p> 
          </Feature> 
          <Feature> 
            <FeatureTitle>Real-Time Tracking</FeatureTitle> 
            <p>Monitor the progress of every task and project in real-time.</p> 
          </Feature> 
          <Feature> 
            <FeatureTitle>Effective Collaboration</FeatureTitle> 
            <p>Facilitate communication and collaboration among team members.</p> 
          </Feature> 
        </FeatureList> 
      </Features> 

      <Footer> 
        <FooterList> 
          <li> 
            <FooterLink href="#about">Who We Are</FooterLink> 
          </li> 
          <li> 
            <FooterLink href="#features">What We Seek</FooterLink> 
          </li> 
          <li> 
            <FooterLink href="/privacy-policy">All rights reserved</FooterLink> 
          </li> 
          <li> 
            <FooterLink href="/terms-of-service">©</FooterLink> 
          </li> 
        </FooterList> 
      </Footer> 
    </Container> 
  ); 
}; 

export default HomePage; 
