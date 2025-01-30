import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  adds: [], 
  status: 'idle',
  error: null,
};

export const addAdd = createAsyncThunk(
  'adds/addAdd',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.jwtToken;

      const response = await axios.post(
        'https://api.meebuddy.com/calendar/calendar/adds',
        data, 
        {
          headers: {
            'x-meebuddy-token': token,
            'Content-Type': 'application/json', 
          },
        }
      );

      // console.log(response.data); 

      return response.data;
    } catch (error) {
      console.error('Add add request failed:', error);
      return rejectWithValue(error.response?.data || 'Failed to add data');
    }
  }
);

  
  

const addAddSlice = createSlice({
  name: 'adds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAdd.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addAdd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addAdd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default addAddSlice.reducer;
