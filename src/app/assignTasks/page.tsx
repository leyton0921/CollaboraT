'use client'
import TaskManager from '../components/TaskManager';
import { useState, useEffect } from 'react';
import { Navbar } from '../UI/navbar';
import { useRouter } from 'next/navigation';

export default function AssignTasks() {
  const [isAdmin, setIsAdmin] = useState(true);  // Cambiar a false para la vista de usuario
  const router = useRouter();
  
  const links = [
    { href: "/assignTask", name: "Assign Tasks" },
    { href: "/admin", name: "Home Admin" }  
  ];

  useEffect(() => {
    if (!isAdmin) {
      router.push('/user');  // Redirect to user view if not admin
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      <Navbar links={links} />
      <TaskManager />
    </div>
  );
}
