import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getBanners,
  getServiceBySlug,
  getServices,
} from "@global/services/module";

import type { IBanner, IService, Response } from "@global/types";
import type { ModuleState } from "@global/types/slice";

const initialState: ModuleState = {
  banners: [],
  services: [],
  service: {} as IService,
  loading: false,
  error: null,
};

export const getBannersModule = createAsyncThunk(
  "module/getBanners",
  async (): Promise<Response<IBanner[]>> => await getBanners()
);

export const getServicesModule = createAsyncThunk(
  "module/getServices",
  async (): Promise<Response<IService[]>> => await getServices()
);

export const getServicesBySlugModule = createAsyncThunk(
  "module/getServicesBySlug",
  async (slug: string): Promise<IService | null> => await getServiceBySlug(slug)
);

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannersModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBannersModule.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data || [];
      })
      .addCase(getBannersModule.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      })

      .addCase(getServicesModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServicesModule.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data || [];
      })
      .addCase(getServicesModule.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      })

      .addCase(getServicesBySlugModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServicesBySlugModule.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload || ({} as IService);
      })
      .addCase(getServicesBySlugModule.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      });
  },
});

export default moduleSlice.reducer;
