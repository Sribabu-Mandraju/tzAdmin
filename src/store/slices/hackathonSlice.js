import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHackathon = createAsyncThunk(
  "/admin/hackathon",
  async (_, {getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.jwtToken;

      const res = await axios.get(
        `
${import.meta.env.VITE_API_URL}/hackathon`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
