"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface UserTasksProps {
  userId: number;
}

const UserTasks = ({ userId }: UserTasksProps) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const userTasks = tasks.filter(task => task.assignedUserId === userId);

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {userTasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};



export default UserTasks;
