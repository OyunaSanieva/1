import { createSlice } from '@reduxjs/toolkit';
import type { AuthStateType } from '../../types/authTypes';
import { checkTokenThunk, logoutThunk, signInThunk, signUpThunk } from '../thunkActions/authThunkAction';

const initialState: AuthStateType = {
  accessToken: '',
  user: { status: 'pending' },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkTokenThunk.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.accessToken = action.payload.accessToken;
      state.user.status = 'logged';
      state.user = { ...user, ...state.user };
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user.status = 'logged';
      state.user = { ...user, ...state.user };
    });

    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user.status = 'logged';
      state.user = { ...user, ...state.user };
    });

    builder.addCase(logoutThunk.fulfilled, (state, action) => {
        state.user.status = 'guest';
        state.accessToken = ''
    }
    )
    
    builder.addMatcher(
      (action: { type: string }) =>
        action.type.startsWith('auth/') && action.type.endsWith('/pending'),
      (state) => {
        state.user.status = 'pending';
      },
    );

    builder.addMatcher(
      (action: { type: string }) =>
        action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
      (state) => {
        state.user.status = 'guest';
      },
    );
  },
});

export default authSlice.reducer;
