"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../store/store';
import { addTask } from '../store/slices/tasksSlice';
import { assignTaskToUser } from '../store/slices/usersSlice'; // Asegúrate de importar la acción correcta

const TaskManager = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleAddTask = () => {
    if (taskTitle && selectedUserId !== null) {
      const newTask = {
        id: Date.now(), // Utilizamos Date.now() para generar un ID único
        title: taskTitle,
        description: '', // Puedes agregar una descripción si es necesario
        assignedUserId: selectedUserId,
        completed: false, // Estado inicial de la tarea
      };

      dispatch(addTask(newTask)); // Agrega la tarea al estado global
      dispatch(assignTaskToUser({ userId: selectedUserId, task: newTask })); // Asigna la tarea al usuario específico

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
      <select
        onChange={(e) => setSelectedUserId(Number(e.target.value))}
        value={selectedUserId ?? ''}
      >
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
