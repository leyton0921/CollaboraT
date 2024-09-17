'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTask } from '../store/slices/tasksSlice';
import { assignTaskToUser } from '../store/slices/usersSlice';
import { useState } from 'react';
import styles from '../styles/TaskManager.module.css';

const TaskManager = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState<string>('');
  const [assignedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleAddTask = () => {
    if (taskTitle && selectedUserId && dueDate) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        assignedUserId: selectedUserId,
        completed: false,
        assignedDate,
        dueDate,
      };
      dispatch(addTask(newTask));
      dispatch(assignTaskToUser({ userId: selectedUserId, task: newTask }));
      setTaskTitle('');
      setTaskDescription('');
      setSelectedUserId(null);
      setDueDate('');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Assign Task</h2>
      <input
        type="text"
        value={taskTitle}
        placeholder="Task Title"
        onChange={(e) => setTaskTitle(e.target.value)}
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
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleAddTask} className={styles.button}>Add Task</button>
    </div>
  );
};

export default TaskManager;
