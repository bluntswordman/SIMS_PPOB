import axios from "@global/libs/axios";
import type {
  UserImageRequest,
  UserRequest,
  UserResponse,
} from "@global/types/user";

export const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await axios.get("/profile");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateUser = async (
  request: UserRequest
): Promise<UserResponse> => {
  try {
    const response = await axios.put("/profile/update", {
      first_name: request.first_name,
      last_name: request.last_name,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateUserImage = async (
  image: UserImageRequest
): Promise<UserResponse> => {
  try {
    const response = await axios.put(
      "/profile/image",
      {
        file: image.file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
