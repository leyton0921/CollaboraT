import React, { useState, useEffect } from 'react';
import styles from '../styles/UserTable.module.css';
import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import FormTaskManager from './TaskManager'; 
import { User } from '../interface/user.interface';

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      const data = await response.json();
      setUsers(data); // Asegúrate de que 'data' sea un arreglo
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Llama a la función GET al cargar el componente
  }, []);

  const handleAddTask = () => {
    console.log('Tarea añadida:', {
      taskName,
      taskDescription,
      dueDate,
      taskPriority,
      selectedRole,
      selectedUserId
    });
    handleCloseForm();
  };

  const handleAssignTaskClick = (user: User) => {
    setSelectedUser(user);
    setSelectedUserId(user.id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
    setTaskName('');
    setTaskDescription('');
    setDueDate('');
    setTaskPriority('low');
    setSelectedRole('');
  };

  return (
    <div className={styles.container}>
      {showForm && selectedUser && (
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
          status="" // Ajusta esto según sea necesario
          setStatus={() => {}} // Ajusta esto según sea necesario
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          loading={loading}
          error={error}
          handleAddTask={handleAddTask}
          users={users}
          onClose={handleCloseForm}
        />
      )}
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Tareas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index} className={styles.userRow}>
              <td>
                <span className={styles.avatar}>
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </span>
                {user.name || "No Name"}
              </td>
              <td>{user.role || "No role"}</td>
              <td>
                <ul className={styles.taskList}>
                </ul>
              </td>
              <td className={styles.actions}>
                <button
                  className={styles.assignButton}
                  onClick={() => handleAssignTaskClick(user)}
                >
                  <MdAssignmentAdd />
                </button>
                <button className={styles.assignButton}>
                  <AiOutlineUserDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
