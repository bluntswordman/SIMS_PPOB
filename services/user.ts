import axios from "@/libs/axios";
import type { IUserProfile } from "@/types/user";

export const getUser = async () => {
  const res = await axios.get("/profile");
  return res.data;
};

export const updateUser = async (data: IUserProfile) => {
  const res = await axios.put("/profile/update", {
    first_name: data.firstName,
    last_name: data.lastName,
  });
  return res.data;
};

export const updateUserImage = async (image: any) => {
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
};
