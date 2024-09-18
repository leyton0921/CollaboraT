"use client"
import UploadCSV from '../components/UploadCSV';
import TaskManager from '../controllers/task.controller';


import UserTable from '../components/UserTable';
import { useState, useEffect } from 'react';
import { Navbar } from '../UI/navbar';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [isAdmin, setIsAdmin] = useState(true);  // Cambiar a false para la vista de usuario
  const router = useRouter();
  const links = [
    { href: "/assignTasks", name: "assign tasks" },
    { href: "/admin", name: "Home Admnin" }
  ];

  useEffect(() => {
    if (!isAdmin) {
      router.push('/user');  
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
    
        <Navbar  links={links}/>
          <UploadCSV />
          <UserTable />
          <TaskManager/>
        
    
    </div>
  );
}
