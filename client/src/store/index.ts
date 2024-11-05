import { configureStore } from "@reduxjs/toolkit";
import domTravReducer from "./slices/domTravSlice";

const store = configureStore({
  reducer: {
    domTrav: domTravReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
