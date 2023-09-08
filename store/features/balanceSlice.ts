import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addBalance, getBalance } from "@global/services/balance";

import type { IBalance, RequestBalance, Response } from "@global/types";
import type { BalanceState } from "@global/types/slice";

const initialState = {
  balance: 0,
  loading: false,
  error: null,
} as BalanceState;

export const getBalanceAccount = createAsyncThunk(
  "balance/getBalance",
  async (): Promise<Response<IBalance>> => await getBalance()
);

export const addBalanceAccount = createAsyncThunk(
  "balance/topup",
  async (amount: RequestBalance): Promise<Response<IBalance>> =>
    await addBalance(amount)
);

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBalanceAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.data?.balance ?? 0;
      })
      .addCase(getBalanceAccount.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      })
      .addCase(addBalanceAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBalanceAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.data?.balance ?? 0;
      })
      .addCase(addBalanceAccount.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      });
  },
});

export default balanceSlice.reducer;
