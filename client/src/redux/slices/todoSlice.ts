import { createSlice } from '@reduxjs/toolkit';
import type { TodoState } from '../../types/todoTypes';
import {
  changeTodoStatusThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
  addTodoThunk,
} from '../thunkActions/todoThunkAction';

const initialState: TodoState = {
  status: 'fetching',
  data: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchTodosThunk.pending, (state, action) => {
      state.status = 'fetching';
    });

    builder.addCase(fetchTodosThunk.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data = action.payload;
    });
    builder.addCase(fetchTodosThunk.rejected, (state, action) => {
      state.status = 'error';
    });

    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      state.data = state.data.filter((el) => el.id !== action.payload);
    });

    builder.addCase(changeTodoStatusThunk.fulfilled, (state, action) => {
      const { payload } = action;
      state.data = state.data.map((el) => (el.id === payload.id ? { ...payload } : el));
    });
    builder.addCase(updateTodoThunk.fulfilled, (state, action) => {
      const { payload } = action;
      state.data = state.data.map((el) => (el.id === payload.id ? { ...payload } : el));
    });
    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  },
});

export default todoSlice.reducer;
