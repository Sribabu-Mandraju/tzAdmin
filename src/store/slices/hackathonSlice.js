import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHackathon = createAsyncThunk(
  "/admin/hackathon",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const res = await axios.get(
        `
https://tzbackendnewversion.onrender.com/hackathon`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add authorization header
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Server error");
    }
  }
);

const HackathonSlice = createSlice({
  name: "hackathon",
  initialState: { data: null, error: null, status: "idle" },
  extraReducers: (builders) => {
    builders.addCase(fetchHackathon.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchHackathon.rejected, (state, action) => {
      state.status = "loaded";
      state.error = action.error.message;
      state.data = null;
    });
    builders.addCase(fetchHackathon.fulfilled, (state, action) => {
      state.status = "loaded";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default HackathonSlice.reducer;
export const eventActions = HackathonSlice.actions;
