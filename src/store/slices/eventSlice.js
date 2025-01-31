import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/events`;

const getAuthHeader = (getState) => {
  const token = getState().auth.jwtToken;
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchEvents = createAsyncThunk("/admin/events", async (_, { getState }) => {
  try {
    const res = await axios.get(`${API_URL}/all-events`, getAuthHeader(getState));
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Server error");
  }
});

export const createEvent = createAsyncThunk("/admin/events/create", async (eventData, { getState }) => {
  try {
    const res = await axios.post(`${API_URL}/new`, eventData, getAuthHeader(getState));
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Server error");
  }
});

export const updateEvent = createAsyncThunk("/admin/events/update", async ({ id, eventData }, { getState }) => {
  try {
    const res = await axios.put(`${API_URL}/edit/${id}`, eventData, getAuthHeader(getState));
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Server error");
  }
});

export const deleteEvent = createAsyncThunk("/admin/events/delete", async (id, { getState }) => {
  try {
    await axios.delete(`${API_URL}/delete-event/${id}`, getAuthHeader(getState));
    return id;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Server error");
  }
});

const EventSlice = createSlice({
  name: "event",
  initialState: { data: null, error: null, status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "loaded";
        state.error = action.error.message;
        state.data = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.data = [...(state.data || []), action.payload];
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        // Update only the event with the matching id
        state.data = state.data?.map((event) =>
          event._id === action.payload._id ? { ...event, ...action.payload } : event
        );
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        // Remove only the event with the matching id
        state.data = state.data?.filter((event) => event._id !== action.payload);
      });
  },
});

export default EventSlice.reducer;
export const eventActions = EventSlice.actions;
