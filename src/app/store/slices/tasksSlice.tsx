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

// Definición del estado inicial
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
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
