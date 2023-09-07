import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { IUserProfile } from "@global/types/user";
import { getUser, updateUser, updateUserImage } from "@global/services/user";

const initialState = {
  data: {},
  loading: false,
  error: null,
} as any;

export const getUserProfile = createAsyncThunk("user/getProfile", async () => {
  const res = await getUser();
  return res.data;
});

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (data: IUserProfile) => {
    const res = await updateUser(data);
    return res;
  }
);

export const updateUserProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (image: any) => {
    const res = await updateUserImage(image);
    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
    builder.addCase(updateUserProfileImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfileImage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateUserProfileImage.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default userSlice.reducer;
