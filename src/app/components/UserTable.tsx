import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../controllers/getUsers.controller';
import styles from '../styles/UserTable.module.css';

interface User {
  id: string;
  name: string;
  role: string;
  tasks: { id: string; title: string }[];
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]); //  almacenar los usuarios
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // obtener los usuarios 
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchUsers();
      if (data.length > 0) {
        setUsers(data); // actualiza los usuarios con los datos recibidos
      } else {
        setError('No users found or failed to fetch');
      }
      setLoading(false);
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          {users.map((user) => (
            <tr key={user.id}>
              <td className="flex items-center space-x-4 py-4 pl-4">
                <span className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span>{user.name}</span>
              </td>
              <td>{user.role || "No role"}</td>
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
