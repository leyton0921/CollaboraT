// HomeAdmin.tsx
"use client";
import UploadCSV from '../components/UploadCSV';
import UserTable from '../components/UserTable';
import { useEffect, useState } from 'react';
import Navbar from '../UI/navbar';
import { useRouter } from 'next/navigation';
import Spinner from '../UI/Spiner/spiner';
import FormTaskManager from '../components/TaskManager';
import { User } from '../interface/user.interface';

const HomeAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');

  // useEffect(() => {
  //   if (role !== 'leader') {
  //     router.push("/");
  //   }
  // }, [role, router]);

  // if (role !== 'leader') {
  //   return <Spinner />;
  // }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddTask = () => {
    // Implementa la lógica para agregar la tarea aquí
  };

  const handleCloseForm = () => {
    setShowForm(false);
    // Resetea los estados del formulario si es necesario
    setTaskName('');
    setTaskDescription('');
    setDueDate('');
    setTaskPriority('low');
    setSelectedUser(null);
  };

  return (
    <div>
      <Navbar />
      <button onClick={toggleForm}>Asignar Tareas</button>
      {showForm && (
        <FormTaskManager
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          dueDate={dueDate}
          setDueDate={setDueDate}
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          status=""  
          setStatus={() => { }}
          selectedUserId={selectedUser ? selectedUser.id : null}
          setSelectedUserId={() => { }} 
          loading={loading}
          error={error}
          handleAddTask={handleAddTask}
          users={users}
          onClose={handleCloseForm}
        />
      )}
      <UserTable />
    </div>
  );
}

export default HomeAdmin;
