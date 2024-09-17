import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: number | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  userId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userId = null;
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
