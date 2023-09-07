import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUser, updateUser, updateUserImage } from "@global/services/user";
import type {
  UserImageRequest,
  UserRequest,
  UserResponse,
} from "@global/types/user";

interface UserState {
  user: UserResponse;
  loading: boolean;
  error: string | null;
}

const initialState = {
  user: {},
  loading: false,
  error: null,
} as UserState;

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (): Promise<UserResponse> => {
    const response = await getUser();
    return response;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (request: UserRequest): Promise<UserResponse> => {
    const response = await updateUser(request);
    return response;
  }
);

export const updateUserImageProfile = createAsyncThunk(
  "user/updateProfileImage",
  async (request: UserImageRequest): Promise<UserResponse> => {
    const response = await updateUserImage(request);
    return response;
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
      state.user = action.payload;
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
      state.user = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });

    builder.addCase(updateUserImageProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserImageProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUserImageProfile.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default userSlice.reducer;
