import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk(
  "/admin /get-all",
  async (_, {getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.jwtToken;
      const res = await axios.get(
        `https://tzbackendnewversion.onrender.com/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add authorization header
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState: { data: null, error: null, status: "idle" },
  extraReducers: (builders) => {
    builders.addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "loaded";
      state.error = action.error.message;
      state.data = null;
    });
    builders.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "loaded";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default UsersSlice;
export const eventActions = UsersSlice.actions;
