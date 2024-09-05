"use client"
import UploadCSV from '../components/UploadCSV';
import TaskManager from '../components/TaskManager';
import UserTable from '../components/UserTable';
import UserTasks from '../components/UserTask';
import { useState } from 'react';
import { Navbar } from '../components/navbar';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(true);  // Cambiar a false para la vista de usuario
  const userId = 1;  // Simular un usuario autenticado

  return (
    <div>
      {isAdmin ? (
        <>
        <Navbar />
          <h1>Admin Panel</h1>
          <UploadCSV />
          <UserTable />
          <TaskManager />
        </>
      ) : (
        <>
          <h1>User View</h1>
          <UserTasks userId={userId} />
        </>
      )}
    </div>
  );
}
