import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSlotReport = createAsyncThunk(
  'slotReport/fetchSlotReport',
  async (mandalId, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.auth.jwtToken;
    // console.log(mandalId);
    try {
      const response = await axios.get(`https://api.meebuddy.com/calendar/calendar/mandal/${mandalId}/report`, {
        headers: {
          'x-meebuddy-token': token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch slot report');
    }
  }
);

const slotReportSlice = createSlice({
  name: 'slotReport',
  initialState: {
    mandalId: null,
    report: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetSlotReport: (state) => {
      state.mandalId = null;
      state.report = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlotReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlotReport.fulfilled, (state, action) => {
        state.loading = false;
        state.mandalId = action.payload.mandalId;
        state.report = action.payload.report;
      })
      .addCase(fetchSlotReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetSlotReport } = slotReportSlice.actions;

export default slotReportSlice.reducer;
