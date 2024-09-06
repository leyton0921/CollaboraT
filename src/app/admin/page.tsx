"use client"
import UploadCSV from '../components/UploadCSV';
import TaskManager from '../components/TaskManager';
import UserTable from '../components/UserTable';
import { useState, useEffect } from 'react';
import { Navbar } from '../UI/navbar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(true);  // Cambiar a false para la vista de usuario
  const router = useRouter();
  const links = [
    { href: "/", name: "task" },
    { href: "/abut", name: "Home Admnin" }
  ];

  useEffect(() => {
    if (!isAdmin) {
      router.push('/user');  // Redirige si no es administrador
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      <Navbar links={links} />
      {isAdmin ? (
        <>
          <h1>Admin Panel</h1>
          <UploadCSV />
          <UserTable />
          <TaskManager />
        </>
      ) : null}
    </div>
  );
}
