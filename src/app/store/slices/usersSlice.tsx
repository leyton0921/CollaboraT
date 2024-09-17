import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task }  from './tasksSlice';

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
    updateUserTask(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      state.users.forEach(user => {
        user.tasks = user.tasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    },
  },
});


export const { setUsers, addUser, assignTaskToUser,updateUserTask } = usersSlice.actions;
export default usersSlice.reducer;
