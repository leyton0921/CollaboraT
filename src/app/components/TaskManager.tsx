"use client";  
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../store/store';
import { addTask } from '../store/slices/tasksSlice';

const TaskManager = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleAddTask = () => {
    if (taskTitle && selectedUserId) {
      const newTask = { id: Date.now(), title: taskTitle, assignedUserId: selectedUserId };
      dispatch(addTask(newTask));
      setTaskTitle('');
      setSelectedUserId(null);
    }
  };

  return (
    <div>
      <h2>Assign Task</h2>
      <input
        type="text"
        value={taskTitle}
        placeholder="Task Title"
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <select onChange={(e) => setSelectedUserId(Number(e.target.value))} value={selectedUserId ?? ''}>
        <option value="" disabled>Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskManager;