import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedUserId: number;
  completed: boolean;
  assignedDate: string;
  dueDate: string;
  // idManager: number;
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
    markTaskCompleted(state, action: PayloadAction<number>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = true;
      }
    },
  },
});

export const { addTask, markTaskCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;
