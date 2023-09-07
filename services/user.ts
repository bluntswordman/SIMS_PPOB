import axios from "@/libs/axios";
import type { IUserProfile } from "@/types/user";

export const getUser = async () => {
  try {
    const res = await axios.get("/profile");
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateUser = async (data: IUserProfile) => {
  try {
    const res = await axios.put("/profile/update", {
      first_name: data.firstName,
      last_name: data.lastName,
    });

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateUserImage = async (image: any) => {
  try {
    const res = await axios.put(
      "/profile/image",
      {
        file: image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
