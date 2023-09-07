import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import {
  balanceSlice,
  moduleSlice,
  transactionSlice,
  userSlice,
} from "./features";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      balance: balanceSlice,
      module: moduleSlice,
      transaction: transactionSlice,
    },
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
