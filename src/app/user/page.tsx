"use client";
import UserTasks from '../components/UserTask'; // Importar componente de tareas de usuario
import { Navbar } from '../UI/navbar'; // Importar barra de navegación

export default function UserPage() {
  const userId = 1;  // Simulación de usuario autenticado

  return (
    <div>
      <Navbar /> {/* Barra de navegación del usuario */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Vista de Usuario</h1>
        <UserTasks userId={userId} />  {/* Mostrar las tareas asignadas al usuario */}
      </div>
    </div>
  );
}
