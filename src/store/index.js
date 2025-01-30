import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import { saveState, loadState } from "./localStorageUtils";
import WorkshopSlice from "./slices/workshopSlice";
import EventSlice from "./slices/eventSlice";
import UsersSlice from "./slices/userSlice";
import NotificationSlice from "./slices/notificationSlice";
import MegaExpoSlice from "./slices/megaExpoSlice";
import HackathonSlice from "./slices/hackathonSlice";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    workshops: WorkshopSlice,
    events: EventSlice,
    users: UsersSlice,
    notifications: NotificationSlice,
    megaExpo: MegaExpoSlice,
    hackathon: HackathonSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    workshops: WorkshopSlice,
    events: EventSlice,
    users: UsersSlice,
    notifications: NotificationSlice,
    megaExpo: MegaExpoSlice,
    hackathon: HackathonSlice,
  });
});

export default store;
