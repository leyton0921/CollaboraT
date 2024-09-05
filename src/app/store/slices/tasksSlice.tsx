"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
  assignedUserId?: number;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    assignTask: (state, action: PayloadAction<{ taskId: number; userId: number }>) => {
      const { taskId, userId } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.assignedUserId = userId;
      }
    },
  },
});

export const { addTask, assignTask } = tasksSlice.actions;
export default tasksSlice.reducer;
