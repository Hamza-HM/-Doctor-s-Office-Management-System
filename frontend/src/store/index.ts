import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import testReducer from "./reducers/testReducer";
import { appointments } from "./api/appointments";

export const store = configureStore({
  reducer: {
    counter: testReducer,
    [appointments.reducerPath]: appointments.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appointments.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
