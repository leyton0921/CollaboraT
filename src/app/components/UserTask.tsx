import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Style from '../styles/UserTasks.module.css'; 
import { CiCalendar } from "react-icons/ci";

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
    <div className={Style['tasks-container']}> {/* Corrected className usage */}
      <h2 className={Style['tasks-title']}>Task List</h2>
      <ul className={Style['list']}>
        {user.tasks && user.tasks.length > 0 ? (
          user.tasks.map((task) => (
            <li key={task.id} className={Style['task-item']}> {/* Corrected className usage */}
              <div className={Style['task-header']}>
                <h3 className={Style['task-title']}>{task.title}</h3>
                <span
                  className={`${Style['task-status']} ${
                    task.completed ? Style['in-progress'] : Style['todo']
                  }`} 
                >
                  {task.completed ? 'In Progress' : 'Todo'} {/* Display meaningful text */}
                </span>
              </div>
              <p className={Style['task-description']}>{task.description}</p>
              <div className={Style['task-dates']}>
                <span ><CiCalendar /></span>
                <p>
                  {new Date(task.assignedDate).toLocaleDateString()} -{' '}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className={Style['task-assignee']}>
                <div className={Style['avatar']}>
                  <p className={Style['UserInitial']}>{user.name.charAt(0).toUpperCase()}</p>
                </div>
                <p className={Style['name']}>{user.name}</p>
              </div>
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
