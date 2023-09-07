import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addTransaction,
  getHistoryTransaction,
} from "@global/services/transaction";

interface IHistoryTransaction {
  offset?: number;
  limit?: number;
}

const initialState = {
  transaction: {},
  history: [],
  hasMore: true,
  loading: false,
  error: null,
} as any;

export const addTransactionModule = createAsyncThunk(
  "transaction/addTransaction",
  async (code: string) => {
    const res = await addTransaction(code);
    return res.data;
  }
);

export const getHistoryTransactionModule = createAsyncThunk(
  "transaction/getHistoryTransaction",
  async (request: IHistoryTransaction) => {
    const res = await getHistoryTransaction(request);
    console.log(res);
    
    return res;
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTransactionModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTransactionModule.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });
    builder.addCase(addTransactionModule.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
    builder.addCase(getHistoryTransactionModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHistoryTransactionModule.fulfilled, (state, action) => {
      state.loading = false;
      state.history = [...state.history, ...action.payload];
      state.hasMore = action.payload.length > 0;
    });
    builder.addCase(getHistoryTransactionModule.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default transactionSlice.reducer;
