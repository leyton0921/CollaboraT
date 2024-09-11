'use client'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from '../styles/UserTasks.module.css';

interface UserTasksProps {
  userId: number;
}

const UserTasks = ({ userId }: UserTasksProps) => {
  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === userId)
  );

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className={styles.tasksContainer}>
      <h2>Tus Tareas</h2>
      <ul className={styles.taskList}>
        {user.tasks && user.tasks.length > 0 ? (
          user.tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Asignada:</strong> {new Date(task.assignedDate).toLocaleDateString()}</p>
              <p><strong>Fecha límite:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No hay tareas asignadas.</p>
        )}
      </ul>
    </div>
  );
};

export default UserTasks;
