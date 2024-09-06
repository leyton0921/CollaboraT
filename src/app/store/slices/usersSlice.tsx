"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definición de la estructura de una tarea
interface Task {
  id: number;
  title: string;
  description: string;
  assignedUserId: number;
  completed: boolean;
}

// Definición de la estructura de un usuario
interface User {
  id: number;
  name: string;
  rol: string;
  tasks: Task[]; // Tareas asignadas a este usuario
}

// Definición del estado inicial
interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    assignTaskToUser: (state, action: PayloadAction<{ userId: number; task: Task }>) => {
      const { userId, task } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.tasks.push(task); // Añade la tarea al usuario
      }
    },
  },
});

export const { setUsers, addUser, assignTaskToUser } = usersSlice.actions;
export default usersSlice.reducer;
