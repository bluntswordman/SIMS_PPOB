import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import balanceSlice from "./features/balanceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      balance: balanceSlice,
    },
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
