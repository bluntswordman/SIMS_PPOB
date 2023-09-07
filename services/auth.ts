import axios from "@/libs/axios";
import type { IFormRegister } from "@/types/auth";

export const register = async (data: IFormRegister) => {
  try {
    const res = await axios.post("/registration", {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error?.response.data.message);
  }
};
