import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWorkshops = createAsyncThunk("/admin/workshops", async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/workshops/all-workshops`
    );
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data.message || "Internal Server error");
  }
});

const WorkshopSlice = createSlice({
  name: "workshop",
  initialState: { data: null, error: null, status: "idle" },
  extraReducers: (builders) => {
    builders.addCase(fetchWorkshops.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchWorkshops.rejected, (state, action) => {
      state.status = "loaded";
      state.error = action.error.message;
      state.data = null;
    });
    builders.addCase(fetchWorkshops.fulfilled, (state, action) => {
      state.status = "loaded";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default WorkshopSlice;
export const workshopActions = WorkshopSlice.actions;
