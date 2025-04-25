import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('access_token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, action) => {
      const { response } = action.payload;

      state.user = response.data;
      state.accessToken = response.access_Token;

      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('access_token', response.access_Token);
    },
    onLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
    }
  }
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
