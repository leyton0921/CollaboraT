'use client'

import UserTasks from "../components/UserTask";
import { Navbar } from "../UI/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Users() {

  const links = [
    { href: "/", name: "task" },
    { href: "/abut", name: "Home Admnin" }
  ];
  // Verifica el estado de tasks y users
const tasks = useSelector((state: RootState) => state.tasks.tasks);
const users = useSelector((state: RootState) => state.users.users);
console.log('Tasks:', tasks);
console.log('Users:', users);
    const userId = 2;  // Simular un usuario autenticado
    return (
        
        <div>
           <Navbar links={links} />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Vista de Usuario</h1>
            <UserTasks userId={userId} />
        </div>

        </div>
    )

}
