import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    positions: [],
    status: 'idle',
    error: null,
    fetched: false,
    expenseStatus: null, 
};

export const getPositions = createAsyncThunk(
    'positions/get',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth.jwtToken;
            // console.log(token);

            const response = await axios.get('https://api.meebuddy.com/calendar/calendar/positions', {
                headers: {
                    'x-meebuddy-token': token
                }
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch positions');
        }
    }
);

const positionSlice = createSlice({
    name: "positions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPositions.pending, (state) => {
                state.status = 'pending';
                state.error = null; 
            })
            .addCase(getPositions.fulfilled, (state, action) => {
                state.status = 'idle';
                state.positions = action.payload;
                state.fetched = true; // Set fetched to true
            })
            .addCase(getPositions.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
});

export default positionSlice.reducer;
