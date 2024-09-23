import styled from 'styled-components';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <Nav>
      <Logo>CollaboraT</Logo>
      <Menu>
        <Link href="/user" passHref>
          <MenuItem>Mis Tareas</MenuItem>
        </Link>
        <Link href="/taskunassign" passHref>
          <MenuItem>Tareas Sin Asignar</MenuItem>
        </Link>
      </Menu>
      <Actions>
        <Link href="#" passHref>
          <MenuItem>Perfil</MenuItem>
        </Link>
        <Link href="/" passHref>
          <LogoutButton>Salir</LogoutButton>
        </Link>
      </Actions>
    </Nav>
  );
};

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #00a64e; /* Fondo verde */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin: 10px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
`;

const Logo = styled.div`
  font-family: 'Segoe UI', 'Arial', sans-serif;  
  font-size: 1.8rem;
  color: white; /* Letras blancas */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Menu = styled.div`
  display: flex;
  gap: 24px;
`;

const MenuItem = styled.a`
  color: white; /* Letras blancas */
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 8px 16px;
  border-radius: 12px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
  text-decoration: none; /* Sin subrayado */

  &:hover {
    color: #00a64e;
    background-color: white; /* Efecto de hover */
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: white; /* Letras blancas */
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 8px 16px;
    border-radius: 12px;
    font-family: 'Segoe UI', 'Arial', sans-serif;
    text-decoration: none; /* Sin subrayado */

    &:hover {
      color: #00a64e;
      background-color: white; /* Efecto de hover */
    }
  }
`;

const LogoutButton = styled.button`
  background-color: white; /* Fondo blanco */
  color: #00a64e; /* Texto verde */
  padding: 10px 24px;
  border-radius: 24px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', 'Arial', sans-serif;

  &:hover {
    background-color: #008f44; /* Verde más oscuro al hacer hover */
    color: white;
  }
`;