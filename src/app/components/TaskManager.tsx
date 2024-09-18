'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTask } from '../store/slices/tasksSlice';
import { assignTaskToUser } from '../store/slices/usersSlice';
import { useState } from 'react';
import styles from '../styles/TaskManager.module.css';

const TaskManager = () => {
  const dispatch = useDispatch();

  // Obtener usuarios del store
  const users = useSelector((state: RootState) => state.users.users);

  // Estados para los campos de la tarea
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState<string>('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [status, setStatus] = useState<'pending' | 'in progress' | 'completed'>('pending');
  const [assignedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleAddTask = () => {
    // Validaciones antes de crear la tarea
    if (!taskName || !selectedUserId || !dueDate || !taskPriority) {
      alert('Please fill all fields');
      return;
    }

    const newTask = {
      id: Date.now().toString(),  // Generar un ID temporal 
      name: taskName,
      description: taskDescription || '',
      dueDate,
      startDate: new Date().toISOString(),
      priority: taskPriority,
      status: status,
      projectId: 'dummy_project_id',
      collaboratorAssignedId: selectedUserId.toString(),
      createdById: 'current_user_id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Agregar la tarea al store
    dispatch(addTask(newTask));


    dispatch(assignTaskToUser({ userId: selectedUserId, task: newTask }));

    // Limpiar los campos después de agregar la tarea
    setTaskName('');
    setTaskDescription('');
    setSelectedUserId(null);
    setDueDate('');
    setTaskPriority('low');
    setStatus('pending');
  };

  return (
    <div className={styles.container}>
      <h2>Assign Task</h2>

      <input
        type="text"
        value={taskName}
        placeholder="Task Name"
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
        onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : null)}
        value={selectedUserId ?? ''}
        className={styles.selectField}
      >
        <option value="" disabled>Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
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

      <button onClick={handleAddTask} className={styles.button}>
        Add Task
      </button>
    </div>
  );
};

export default TaskManager;
