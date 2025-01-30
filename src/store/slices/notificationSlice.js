import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
  "/admin/notifications",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/notifications/all-notifications`
      );
      return res.data.notifications;
    } catch (error) {
      throw new Error(error?.response?.data.message || "Internal Server error");
    }
  }
);

const NotificationSlice = createSlice({
  name: "notification",
  initialState: { data: null, error: null, status: "idle" },
  extraReducers: (builders) => {
    builders.addCase(fetchNotifications.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchNotifications.rejected, (state, action) => {
      state.status = "loaded";
      state.error = action.error.message;
      state.data = null;
    });
    builders.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.status = "loaded";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default NotificationSlice;
export const notificationActions = NotificationSlice.actions;
