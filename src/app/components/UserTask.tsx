import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { markTaskCompleted } from '../store/slices/tasksSlice';
import { updateUserTask } from '../store/slices/usersSlice';
import Style from '../styles/UserTasks.module.css'; 
import { CiCalendar } from "react-icons/ci";

interface UserTasksProps {
  userId: number;
}

const UserTasks = ({ userId }: UserTasksProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === userId)
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  const handleMarkCompleted = (taskId: number) => {
 
    dispatch(markTaskCompleted(taskId));


    const updatedTask = tasks.find(task => task.id === taskId);

    if (updatedTask) {

      dispatch(updateUserTask(updatedTask));
    }
  };

  return (
    <div className={Style['tasks-container']}>
      <h2 className={Style['tasks-title']}>Task List</h2>
      <ul className={Style['list']}>
        {user.tasks && user.tasks.length > 0 ? (
          user.tasks.map((task) => (
            <li key={task.id} className={Style['task-item']}>
              <div className={Style['task-header']}>
                <h3 className={Style['task-title']}>{task.title}</h3>
                <span
                  className={`${Style['task-status']} ${
                    task.completed ? Style['completed'] : Style['in-progress']
                  }`}
                >
                  {task.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <p className={Style['task-description']}>{task.description}</p>
              <div className={Style['task-dates']}>
                <span><CiCalendar /></span>
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
              
              {!task.completed && (
                <button onClick={() => handleMarkCompleted(task.id)} className={Style['button']}>
                  Mark as Completed
                </button>
              )}
              {task.completed && (
                <p className={Style['completed-message']}>This task is completed.</p>
              )}
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
