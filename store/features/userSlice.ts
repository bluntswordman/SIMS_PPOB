import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUser, updateUser, updateUserImage } from "@global/services/user";

import type {
  IUser,
  RequestUser,
  RequestUserImage,
  Response,
} from "@global/types";
import type { UserState } from "@global/types/slice";

const initialState = {
  user: {},
  loading: false,
  error: null,
} as UserState;

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (): Promise<Response<IUser>> => await getUser()
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (request: RequestUser): Promise<Response<IUser>> =>
    await updateUser(request)
);

export const updateUserImageProfile = createAsyncThunk(
  "user/updateProfileImage",
  async (request: RequestUserImage): Promise<Response<IUser>> =>
    await updateUserImage(request)
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      })

      .addCase(updateUserImageProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserImageProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserImageProfile.rejected, (state) => {
        state.loading = false;
        state.error = "error";
      });
  },
});

export default userSlice.reducer;
