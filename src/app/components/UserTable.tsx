import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from '../styles/UserTable.module.css';
import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";


const UserTable = () => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Tasks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className={styles.userRow}>
              <td>
                <span className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name}
              </td>
              <td>{user.role || "No role"}</td>
              <td>
                <ul className={styles.taskList}>
                  {user.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{}</li>
                  ))}
                </ul>
              </td>
              <td className={styles.accions}>
                <button className={styles.assignButton}><MdAssignmentAdd /></button>
                <button className={styles.assignButton}><AiOutlineUserDelete /></button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
