// src/store/slices/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
  description: string;
  assignedUserId: number;
  completed: boolean;
  assignedDate: string;
  dueDate: string;
}

export interface User {
  id: number;
  name: string;
  role: string;
  tasks: Task[]; 
}

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
        user.tasks = user.tasks || [];
        user.tasks.push(task);
      } else {
        console.error('User not found:', userId);
      }
    },
  },
});


export const { setUsers, addUser, assignTaskToUser } = usersSlice.actions;
export default usersSlice.reducer;
