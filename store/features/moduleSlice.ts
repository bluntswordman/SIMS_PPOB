import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getBanners,
  getServices,
  getServicesBySlug,
} from "@global/services/module";

const initialState = {
  banners: [],
  services: [],
  service: {},
  loading: false,
  error: null,
} as any;

export const getBannersModule = createAsyncThunk(
  "module/getBanners",
  async () => {
    const res = await getBanners();
    return res.data;
  }
);

export const getServicesModule = createAsyncThunk(
  "module/getServices",
  async () => {
    const res = await getServices();
    console.log(res);

    return res.data;
  }
);

export const getServicesBySlugModule = createAsyncThunk(
  "module/getServicesBySlug",
  async (slug: string) => {
    const res = await getServicesBySlug(slug);
    return res;
  }
);

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBannersModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBannersModule.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = action.payload;
    });
    builder.addCase(getBannersModule.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
    builder.addCase(getServicesModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getServicesModule.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
    });
    builder.addCase(getServicesModule.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
    builder.addCase(getServicesBySlugModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getServicesBySlugModule.fulfilled, (state, action) => {
      state.loading = false;
      state.service = action.payload;
    });
    builder.addCase(getServicesBySlugModule.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default moduleSlice.reducer;
