import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('jwtToken')),
  jwtToken: localStorage.getItem('jwtToken') || null,
  role:localStorage.getItem('role') || null
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setJwtToken(state, action) {
      state.jwtToken = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { setAuthenticated, setJwtToken } = AuthSlice.actions;
export default AuthSlice.reducer;
