"use client";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from '../styles/UserTasks.module.css';  // Importar estilos personalizados

interface UserTasksProps {
  userId: number;
}

const UserTasks = ({ userId }: UserTasksProps) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const userTasks = tasks.filter(task => task.assignedUserId === userId);

  return (
    <div className={styles.tasksContainer}>
      <h2 className={styles.title}>Tus Tareas</h2>
      <ul className={styles.taskList}>
        {userTasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <span>{task.title}</span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {/* lógica para marcar como completada */}
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;
