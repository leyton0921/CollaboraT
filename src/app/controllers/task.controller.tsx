import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTask } from '../store/slices/tasksSlice';
import { assignTaskToUser } from '../store/slices/usersSlice';
import { useState } from 'react';
import FormTaskManager from '../components/TaskManager';
import { v4 as uuidv4 } from 'uuid';

const TaskManager = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState<string>('');
  const [taskPriority, setTaskPriority] = useState<string>('low');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [status, setStatus] = useState<string>('pending');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createdById = uuidv4(); 
  const projectId = uuidv4(); 

  const handleAddTask = async () => {
    if (!taskName || !selectedUserId || !dueDate || !taskPriority || !selectedRole) {
      alert('Please fill all fields');
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      collaboratorAssignedId: selectedUserId, // Asegúrate de que esto sea un UUID válido
      priority: taskPriority,
      startDate: new Date().toISOString(),
      dueDate,
      createdById, // UUID válido del usuario creador
      projectId, // UUID válido del proyecto
    };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:4000/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to store the task in the database: ${errorDetails.message || 'Unknown error'}`);
      }

      const result = await response.json();
      dispatch(addTask(result));
      dispatch(assignTaskToUser({ userId: selectedUserId, task: result }));

      setTaskName('');
      setTaskDescription('');
      setSelectedUserId(null);
      setDueDate('');
      setTaskPriority('low');
      setStatus('pending');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
    />
  );
};

export default TaskManager;
