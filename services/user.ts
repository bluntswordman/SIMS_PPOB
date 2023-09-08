import axios from "@global/libs/axios";
import type {
  IUser,
  RequestUser,
  RequestUserImage,
  Response,
} from "@global/types";

export const getUser = async (): Promise<Response<IUser>> => {
  try {
    const response = await axios.get("/profile");

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateUser = async (
  request: RequestUser
): Promise<Response<IUser>> => {
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
  image: RequestUserImage
): Promise<Response<IUser>> => {
  try {
    const response = await axios.put(
      "/profile/image",
      {
        file: image.profile_image,
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
