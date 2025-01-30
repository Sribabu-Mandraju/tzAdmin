import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './slices/AuthSlice';
import { saveState, loadState } from './localStorageUtils';
import SlotReportSlice from './slices/SlotReportSlice';
import addAddSlice from './slices/addAddSlice';

import PositionSlice from './slices/PositionSlice';

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        positions:PositionSlice,
        report:SlotReportSlice,
        add:addAddSlice
    },
    preloadedState
});



store.subscribe(() => {
    saveState({
        auth: store.getState().auth,
        // positions:store.getState().positions,
        // report:store.getState().report,
        // add:store.getState().add
    });
});

export default store;
