import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from '../styles/UserTable.module.css';

const UserTable = () => {
  const users = useSelector((state: RootState) => state.users.users);
  console.log(users)


  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Task Count</th>
            <th>Assign Task</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="flex items-center space-x-4 py-4 pl-4">
                <span className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span>{user.name}</span>
              </td>
              <td>{user.role || "no role"}</td>
              <td className={styles.taskCount}>{user.tasks.length || 0}</td>
              <td className="py-4 text-center">
                <input type="checkbox" className={styles.checkbox} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;