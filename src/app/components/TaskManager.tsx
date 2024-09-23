import React from 'react';
import styles from '../styles/TaskManager.module.css';
import FormTaskManagerProps from '../interface/tasks.interface';
import { IoIosCloseCircleOutline } from "react-icons/io";

const FormTaskManager: React.FC<FormTaskManagerProps> = ({
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  dueDate,
  setDueDate,
  taskPriority,
  setTaskPriority,
  selectedRole,
  setSelectedRole,
  status,
  setStatus,
  selectedUserId,
  setSelectedUserId,
  loading,
  error,
  handleAddTask,
  users, // Aquí tienes la lista de usuarios
  onClose
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoIosCloseCircleOutline />
        </button>
        <h2>Assign Task</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          value={taskName}
          placeholder="Task Title"
          onChange={(e) => setTaskName(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          value={taskDescription}
          placeholder="Task Description"
          onChange={(e) => setTaskDescription(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.dateField}
        />
        <select
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          value={selectedUserId ?? ''}
          className={styles.selectField}
        >
          <option value="" disabled>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option> // Aquí accedes a user.name
          ))}
        </select>
        <select
          onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
          value={taskPriority}
          className={styles.selectField}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
          className={styles.selectField}
        >
          <option value="" disabled>Select role</option>
          <option value="contador">Contador</option>
        </select>
        <button onClick={handleAddTask} className={styles.button}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default FormTaskManager