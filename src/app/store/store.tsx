"use client";
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
