import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NavbarUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <Nav>
      <Logo>CollaboraT</Logo>
      <ToggleButton onClick={toggleMenu}>
        ☰
      </ToggleButton>
      <Menu open={isMenuOpen}>
        <Link href="/user" passHref>
          <MenuItem>My Tasks</MenuItem>
        </Link>
        <Link href="/taskunassign" passHref>
          <MenuItem>Unassigned Tasks</MenuItem>
        </Link>
        <Link href="#" passHref>
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href="/" passHref>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Link>
      </Menu>
    </Nav>
  );
};

export default NavbarUser;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #00a64e;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin: 10px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 16px;
  position: absolute;
  top: 60px;
  right: 24px;
  background-color: #00a64e;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: max-height 0.3s ease-in;

  @media (min-width: 769px) {
    display: flex;
    position: static;
    max-height: none;
    flex-direction: row;
    gap: 24px;
  }
`;

const MenuItem = styled.a`
  color: white;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 8px 16px;
  border-radius: 12px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: #00a64e;
    background-color: white;
  }
`;

const LogoutButton = styled.button`
  background-color: white;
  color: #00a64e;
  padding: 10px 24px;
  border-radius: 24px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', 'Arial', sans-serif;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #008f44;
    color: white;
  }
`;
