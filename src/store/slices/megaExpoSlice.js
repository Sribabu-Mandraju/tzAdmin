import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMegaExpo = createAsyncThunk(
  "/admin/megaExpo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projectExpo`,
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

const MegaExpoSlice = createSlice({
  name: "megaExpo",
  initialState: { data: null, error: null, status: "idle" },
  extraReducers: (builders) => {
    builders.addCase(fetchMegaExpo.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchMegaExpo.rejected, (state, action) => {
      state.status = "loaded";
      state.error = action.error.message;
      state.data = null;
    });
    builders.addCase(fetchMegaExpo.fulfilled, (state, action) => {
      state.status = "loaded";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default MegaExpoSlice;
export const eventActions = MegaExpoSlice.actions;
