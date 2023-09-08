import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addTransaction,
  getHistoryTransaction,
} from "@global/services/transaction";

import type {
  ITransaction,
  RequestHistoryTransaction,
  RequestTransaction,
  Response,
} from "@global/types";
import type { TransactionState } from "@global/types/slice";

const initialState: TransactionState = {
  transaction: {} as ITransaction,
  histories: [],
  hasMore: true,
  loading: false,
  error: null,
};

export const addTransactionModule = createAsyncThunk(
  "transaction/addTransaction",
  async (request: RequestTransaction): Promise<Response<ITransaction>> =>
    await addTransaction(request)
);

export const getHistoryTransactionModule = createAsyncThunk(
  "transaction/getHistoryTransaction",
  async (request: RequestHistoryTransaction): Promise<ITransaction[]> =>
    await getHistoryTransaction(request)
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTransactionModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransactionModule.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload.data || ({} as ITransaction);
      })
      .addCase(addTransactionModule.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      })

      .addCase(getHistoryTransactionModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistoryTransactionModule.fulfilled, (state, action) => {
        state.loading = false;
        state.histories = [...state.histories, ...action.payload];
        state.hasMore = action.payload.length > 0;
      })
      .addCase(getHistoryTransactionModule.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      });
  },
});

export default transactionSlice.reducer;
