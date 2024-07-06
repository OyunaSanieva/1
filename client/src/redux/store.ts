import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todoSlice';
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    auth: authReducer,
  },
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
