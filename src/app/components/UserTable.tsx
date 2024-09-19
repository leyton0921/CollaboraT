import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from '../styles/UserTable.module.css';
import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import FormTaskManager from './TaskManager'; 
import { User } from '../interface/user.interface';

const UserTable = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [selectedRole, setSelectedRole] = useState('');
  const [status, setStatus] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Manejo del estado de carga
  const [error, setError] = useState('');

  const handleAddTask = () => {
    // Implementa tu lógica para agregar una tarea aquí
    console.log('Tarea añadida:', {
      taskName,
      taskDescription,
      dueDate,
      taskPriority,
      selectedRole,
      selectedUserId
    });
    handleCloseForm(); // Cierra el formulario después de agregar la tarea
  };

  const handleAssignTaskClick = (user: User) => {
    setSelectedUser(user);
    setSelectedUserId(user.id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
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
          status={status}
          setStatus={setStatus}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          loading={loading}
          error={error}
          handleAddTask={handleAddTask}
          users={users}
          onClose={handleCloseForm}
        />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Tasks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className={styles.userRow}>
              <td>
                <span className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name}
              </td>
              <td>{user.role || "No role"}</td>
              <td>
                <ul className={styles.taskList}>
                  {user.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task.name}</li>
                  ))}
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
