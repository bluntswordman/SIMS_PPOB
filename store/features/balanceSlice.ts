import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getBalance, addBalance } from "@global/services/balance";

const initialState = {
  data: {},
  loading: false,
  error: null,
} as any;

export const getBalanceAccount = createAsyncThunk(
  "balance/getBalance",
  async () => {
    const res = await getBalance();
    return res.data;
  }
);

export const addBalanceAccount = createAsyncThunk(
  "balance/topup",
  async (amount: number) => {
    const res = await addBalance(amount);
    return res;
  }
);

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalanceAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBalanceAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getBalanceAccount.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
    builder.addCase(addBalanceAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBalanceAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addBalanceAccount.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default balanceSlice.reducer;
