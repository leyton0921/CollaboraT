import React, { useState, useEffect } from 'react';
import styles from '../styles/UserTable.module.css';
import { AiOutlineUserDelete } from "react-icons/ai";
import FormTaskManager from './TaskManager';
import { User } from '../interface/user.interface';

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/companies/collaborators`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error loading users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddTask = () => {
    console.log('Task added:', {
      taskName,
      taskDescription,
      dueDate,
      taskPriority,
      selectedRole
    });
    handleCloseForm();
  };

  const handleAssignRoleClick = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role || '');
    setShowRoleForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
    setTaskName('');
    setTaskDescription('');
    setDueDate('');
    setTaskPriority('low');
    setSelectedRole('');
    setShowRoleForm(false);
  };

  const handleDeleteUser = async () => {
    if (userToDelete === null) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/v1/companies/collaborator/${userToDelete}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
      setShowDeleteConfirm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const handleChangeRole = async () => {
    if (selectedUser === null || selectedRole === '') return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/v1/companies/collaborator/${selectedUser.id}/role`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newRole: selectedRole }),
      });

      if (!response.ok) {
        throw new Error('Error changing role');
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id ? { ...user, role: selectedRole } : user
        )
      );
      setShowRoleForm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {showDeleteConfirm && (
        <div className={styles.confirmationBanner}>
          <p>Are you sure you want to delete this user?</p>
          <button onClick={handleDeleteUser}>Yes</button>
          <button onClick={cancelDeleteUser}>No</button>
        </div>
      )}

      {showRoleForm && selectedUser && (
        <div className={styles.roleForm}>
          <h3>Change role of {selectedUser.name}</h3>
          <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
            <option value="" disabled>Select a role</option>
            <option value="leader">Leader</option>
            <option value="collaborator">Collaborator</option>
          </select>
          <button onClick={handleChangeRole}>Save</button>
          <button onClick={handleCloseForm}>Cancel</button>
        </div>
      )}

      {showForm && selectedUser && (
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
          status=""
          setStatus={() => { }}
          selectedUserId={selectedUser.id}
          setSelectedUserId={() => { }}
          loading={loading}
          error={error}
          handleAddTask={handleAddTask}
          users={users}
          onClose={handleCloseForm}
        />
      )}
      {loading && <p>Loading users...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index} className={styles.userRow}>
              <td>
                <span className={styles.avatar}>
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </span>
                {user.name || "No Name"}
              </td>
              <td>{user.role || "No role"}</td>
              <td className={styles.actions}>
                <button
                  className={styles.assignButton}
                  onClick={() => handleAssignRoleClick(user)}
                >
                  Change Role
                </button>
                <button
                  className={styles.assignButton}
                  onClick={() => confirmDeleteUser(user.id)}
                >
                  <AiOutlineUserDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
