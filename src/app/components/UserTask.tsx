"use client";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Asegúrate de importar el estado raíz correctamente
import styles from '../styles/UserTasks.module.css'; // Importa estilos si es necesario

interface UserTasksProps {
  userId: number;
}

const UserTasks = ({ userId }: UserTasksProps) => {
  // Obtiene el usuario específico del estado de Redux
  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === userId)
  );

  // Verifica si el usuario existe
  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className={styles.tasksContainer}>
      <h2>Tus Tareas</h2>
      <ul className={styles.taskList}>
        {user.tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;

