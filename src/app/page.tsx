"use client";
import Link from "next/link";
import { Navbar } from "./UI/navbar"; 

export default function Home() {

  const links = [
    { href: "/", name: "task" },
    { href: "/abut", name: "Home Admnin" }
  ];
  return (
    <div>
      <Navbar links={links}/> {/* Barra de navegación común para ambas vistas */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Bienvenido a la Aplicación</h1>
        <p>Selecciona tu vista:</p>

        {/* Enlaces para elegir la vista de administrador o de usuario */}
        <Link href="/admin" passHref>
          <button style={buttonStyle}>Vista de Administrador</button>
        </Link>
        
        <Link href="/user" passHref>
          <button style={buttonStyle}>Vista de Usuario</button>
        </Link>
      </div>
    </div>
  );
}

// Estilo básico para los botones de navegación
const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: '#00a64e',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};