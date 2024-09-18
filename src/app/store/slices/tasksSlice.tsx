import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;  
  name: string;  
  description?: string; 
  dueDate: string;  
  startDate: string;  
  priority: 'low' | 'medium' | 'high'; 
  status: 'pending' | 'in progress' | 'completed';  
  projectId: string;
  collaboratorAssignedId: string; 
  createdById: string;  
  createdAt: string; 
  updatedAt: string;  
  deletedAt?: string;  
  occupations?: string[];  
  comments?: string[];  
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
    markTaskCompleted(state, action: PayloadAction<string>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.status = 'completed'; 
      }
    },
  },
});

export const { addTask, markTaskCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;
