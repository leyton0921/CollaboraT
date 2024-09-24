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
        throw new Error('Error al cargar los usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddTask = () => {
    console.log('Tarea añadida:', {
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
        throw new Error('Error al eliminar el usuario');
      }

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
      setShowDeleteConfirm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
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
        throw new Error('Error al cambiar el rol');
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id ? { ...user, role: selectedRole } : user
        )
      );
      setShowRoleForm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {showDeleteConfirm && (
        <div className={styles.confirmationBanner}>
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          <button onClick={handleDeleteUser}>Sí</button>
          <button onClick={cancelDeleteUser}>No</button>
        </div>
      )}

      {showRoleForm && selectedUser && (
        <div className={styles.roleForm}>
          <h3>Cambiar rol de {selectedUser.name}</h3>
          <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
            <option value="" disabled>Selecciona un rol</option>
            <option value="leader">Leader</option>
            <option value="collaborator">Collaborator</option>
          </select>
          <button onClick={handleChangeRole}>Guardar</button>
          <button onClick={handleCloseForm}>Cancelar</button>
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
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
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
                  Cambiar Rol
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
