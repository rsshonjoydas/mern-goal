import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalRouter from '../features/goal/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalRouter
  },
});
